from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

import pickle
import pandas as pd
import pytesseract
import cv2
import numpy as np
import requests
import logging
import os

# ==============================
# CONFIG
# ==============================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Tesseract Path
pytesseract.pytesseract.tesseract_cmd = (
    os.getenv(
        "TESSERACT_PATH",
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )
)

app = Flask(__name__)
CORS(app)

limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=["20 per minute"]
)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

# ==============================
# LOAD MODEL
# ==============================

try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)

    logging.info("Model loaded successfully")

except Exception as e:
    logging.error(f"Model loading failed: {e}")
    model = None

# ==============================
# LOAD DATASET
# ==============================

try:
    data = pd.read_csv("Training.csv")
    columns = data.drop("prognosis", axis=1).columns.tolist()

    logging.info("Dataset loaded successfully")

except Exception as e:
    logging.error(f"Dataset loading failed: {e}")
    columns = []

# ==============================
# NLP SYMPTOM ENGINE
# ==============================

symptom_keywords = {
    "high_fever": ["fever", "high temperature"],
    "headache": ["headache", "head pain"],
    "vomiting": ["vomit", "vomiting"],
    "cough": ["cough", "dry cough"],
    "abdominal_pain": ["stomach pain", "abdominal pain"],
    "diarrhoea": ["loose motion", "diarrhea"],
    "bloody_stool": ["blood in stool", "bloody stool"]
}


def text_to_symptoms(text):
    text = text.lower()

    sample = [0] * len(columns)

    for i, col in enumerate(columns):

        if col in symptom_keywords:

            for keyword in symptom_keywords[col]:

                if keyword.lower() in text:
                    sample[i] = 1
                    break

    return sample


# ==============================
# RECOMMENDATIONS
# ==============================

disease_rules = {
    "Diabetes": {
        "diet": {
            "foods_to_eat": [
                "Whole grains",
                "Leafy vegetables",
                "Nuts"
            ],
            "foods_to_avoid": [
                "Sugar",
                "Soft drinks"
            ],
        },
        "exercise": {
            "recommended": [
                "Walking",
                "Yoga"
            ],
            "duration": "30 minutes daily"
        },
        "medicine": {
            "common": [
                "Metformin"
            ],
            "note": "Monitor blood sugar regularly"
        }
    }
}


def generate_default(disease):
    return {
        "diet": {
            "foods_to_eat": [
                "Fruits",
                "Vegetables"
            ],
            "foods_to_avoid": [
                "Junk food"
            ],
        },
        "exercise": {
            "recommended": [
                "Walking"
            ],
            "duration": "20 mins daily"
        },
        "medicine": {
            "common": [
                "Consult Doctor"
            ],
            "note": "Avoid self medication"
        }
    }


def get_recommendation(disease):
    return disease_rules.get(
        disease,
        generate_default(disease)
    )

# ==============================
# MEDICINE ENGINE
# ==============================

medicine_db = {
    "Paracetamol": ["paracetamol", "para"],
    "Cimetidine": ["cimetidine"],
    "Beteloc": ["beteloc"]
}


def extract_medicines(text):

    text = text.lower()

    found = set()

    for medicine, keywords in medicine_db.items():

        for keyword in keywords:

            if keyword in text:
                found.add(medicine)

    return list(found)

# ==============================
# OPENFDA
# ==============================


def get_drug_info(drug):

    try:

        url = (
            f"https://api.fda.gov/drug/label.json"
            f"?search={drug}&limit=1"
        )

        response = requests.get(url, timeout=5)

        if response.status_code != 200:
            return {
                "usage": "Not available",
                "warnings": "No data"
            }

        result = response.json()["results"][0]

        usage = result.get(
            "indications_and_usage",
            ["Not available"]
        )[0]

        warnings = result.get(
            "warnings",
            ["No warnings"]
        )[0]

        return {
            "usage": usage[:300],
            "warnings": warnings[:300]
        }

    except Exception as e:

        logging.warning(f"OpenFDA Error: {e}")

        return {
            "usage": "Not available",
            "warnings": "No data"
        }

# ==============================
# IMAGE VALIDATION
# ==============================


def allowed_file(filename):

    return (
        "." in filename and
        filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )

# ==============================
# OCR ENGINE
# ==============================


def process_image(file):

    file_bytes = np.frombuffer(file.read(), np.uint8)

    img = cv2.imdecode(
        file_bytes,
        cv2.IMREAD_COLOR
    )

    if img is None:
        raise ValueError("Invalid image")

    gray = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    text = pytesseract.image_to_string(
        gray,
        config="--oem 3 --psm 6"
    )

    return text

# ==============================
# HOME
# ==============================


@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "status": "running",
        "message": "AI Health Assistant API"
    })

# ==============================
# PREDICT
# ==============================


@app.route("/predict", methods=["POST"])
@limiter.limit("10 per minute")
def predict():

    try:

        if model is None:
            return jsonify({
                "error": "Model not loaded"
            }), 500

        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No input"
            }), 400

        if "text" not in data:
            return jsonify({
                "error": "Text required"
            }), 400

        text = data["text"]

        sample = text_to_symptoms(text)

        print("Input:", text)
        print("Sample:", sample)

        df = pd.DataFrame(
            [sample],
            columns=columns
        )

        disease = model.predict(df)[0]

        recommendation = get_recommendation(
            disease
        )

        return jsonify({
            "success": True,
            "disease": disease,
            "recommendation": recommendation
        })

    except Exception as e:

        logging.error(f"Prediction Error: {e}")

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# ==============================
# OCR UPLOAD
# ==============================


@app.route("/upload", methods=["POST"])
@limiter.limit("5 per minute")
def upload():

    try:

        if "image" not in request.files:
            return jsonify({
                "error": "Image required"
            }), 400

        file = request.files["image"]

        if file.filename == "":
            return jsonify({
                "error": "No file selected"
            }), 400

        if not allowed_file(file.filename):
            return jsonify({
                "error": "Invalid file"
            }), 400

        text = process_image(file)

        medicines = extract_medicines(text)

        drug_info = []

        for med in medicines:

            info = get_drug_info(med)

            drug_info.append({
                "name": med,
                "usage": info["usage"],
                "warnings": info["warnings"]
            })

        return jsonify({
            "success": True,
            "extracted_text": text,
            "medicines": medicines,
            "drug_info": drug_info
        })

    except Exception as e:

        logging.error(f"OCR Error: {e}")

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# ==============================
# RUN
# ==============================

if __name__ == "__main__":

    print("AI Health Assistant Running")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
