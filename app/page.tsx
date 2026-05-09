"use client";

import { useState } from "react";
import axios from "axios";

import Navbar from "../components/navbar";
import FeatureCard from "../components/featurecard";

export default function Home() {

  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const predictDisease = async () => {

    if (!text) {
      alert("Please enter symptoms");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
          text,
        }
      );

      setResult(response.data);

    } catch (error) {

      alert("Backend Error");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to right, #eff6ff, #f8fafc)",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}

      <div
        style={{
          padding: "70px 30px",
          maxWidth: "1300px",
          margin: "auto",
        }}
      >

        <div
          style={{
            textAlign: "center",
          }}
        >

          <h1
            style={{
              fontSize: "65px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            DSC Health Recomendation System
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#475569",
              maxWidth: "850px",
              margin: "auto",
              lineHeight: "40px",
            }}
          >
            Smart healthcare platform powered
            by Machine Learning for
            disease prediction, prescription
            OCR analysis, medicine extraction,
            and personalized healthcare
            recommendations.
          </p>

        </div>

        {/* FEATURE CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
            marginTop: "60px",
          }}
        >
<div
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    padding: "35px",
    borderRadius: "20px",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.3)",
  }}
>
  <h2
    style={{
      fontSize: "28px",
      marginBottom: "15px",
    }}
  >
    Disease Prediction
  </h2>

  <p
    style={{
      fontSize: "18px",
      lineHeight: "30px",
    }}
  >
    Predict diseases using symptom
    analysis and intelligent AI
    healthcare rules.
  </p>
</div>

<div
  style={{
    background:
      "linear-gradient(135deg,#059669,#047857)",
    color: "white",
    padding: "35px",
    borderRadius: "20px",
    boxShadow:
      "0 10px 25px rgba(5,150,105,0.3)",
  }}
>
  <h2
    style={{
      fontSize: "28px",
      marginBottom: "15px",
    }}
  >
    OCR Prescription Analysis
  </h2>

  <p
    style={{
      fontSize: "18px",
      lineHeight: "30px",
    }}
  >
    Upload prescriptions and extract
    medicine details automatically
    using OCR technology.
  </p>
</div>

<div
  style={{
    background:
      "linear-gradient(135deg,#7c3aed,#6d28d9)",
    color: "white",
    padding: "35px",
    borderRadius: "20px",
    boxShadow:
      "0 10px 25px rgba(124,58,237,0.3)",
  }}
>
  <h2
    style={{
      fontSize: "28px",
      marginBottom: "15px",
    }}
  >
    Medicine Intelligence
  </h2>

  <p
    style={{
      fontSize: "18px",
      lineHeight: "30px",
    }}
  >
    Analyze medicines using OCR and
    OpenFDA API integration for
    smart healthcare recommendations.
  </p>
</div>

        </div>

        {/* MAIN PREDICTION BOX */}

        <div
          style={{
            background: "white",
            marginTop: "70px",
            padding: "40px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              fontSize: "35px",
              color: "#0f172a",
            }}
          >
            Enter Your Symptoms
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px",
              fontSize: "18px",
            }}
          >
            Example:
            fever, chills, sweating,
            vomiting
          </p>

          <textarea
            rows={6}
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Type symptoms here..."
            style={{
              width: "100%",
              padding: "20px",
              marginTop: "25px",
              borderRadius: "15px",
              border: "1px solid #cbd5e1",
              fontSize: "18px",
              outline: "none",
              resize: "none",
              background: "#f8fafc",
            }}
          />

          <button
            onClick={predictDisease}
            style={{
              marginTop: "25px",
              padding: "18px",
              width: "100%",
              background:
                "linear-gradient(to right,#2563eb,#1d4ed8)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {loading
              ? "Predicting..."
              : "Predict Disease"}
          </button>

          {/* RESULT SECTION */}

          {result && (

            <div
              style={{
                marginTop: "50px",
                background: "#f8fafc",
                padding: "35px",
                borderRadius: "20px",
                border:
                  "1px solid #e2e8f0",
              }}
            >

              <h2
                style={{
                  fontSize: "40px",
                  color: "#0f172a",
                }}
              >
                {result.disease}
              </h2>

              <div
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding:
                    "8px 18px",
                  borderRadius: "50px",
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  fontWeight: "bold",
                }}
              >
                Severity:
                {" "}
                {
                  result.recommendation
                    .severity
                }
              </div>

              <p
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  lineHeight: "32px",
                  color: "#475569",
                }}
              >
                {
                  result.recommendation
                    .overview
                }
              </p>

              {/* GRID */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(300px,1fr))",
                  gap: "25px",
                  marginTop: "40px",
                }}
              >

                {/* Symptoms */}

                <div
                  style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "15px",
                  }}
                >
                  <h3>Detected Symptoms</h3>

                  <ul>
                    {result.symptoms.map(
                      (
                        symptom: string,
                        index: number
                      ) => (
                        <li key={index}>
                          {symptom}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Foods */}

                <div
                  style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "15px",
                  }}
                >
                  <h3>
                    Foods To Eat
                  </h3>

                  <ul>
                    {result.recommendation.diet.foods_to_eat.map(
                      (
                        food: string,
                        index: number
                      ) => (
                        <li key={index}>
                          {food}
                        </li>
                      )
                    )}
                  </ul>

                  <h3
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Foods To Avoid
                  </h3>

                  <ul>
                    {result.recommendation.diet.foods_to_avoid.map(
                      (
                        food: string,
                        index: number
                      ) => (
                        <li key={index}>
                          {food}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Medicines */}

                <div
                  style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "15px",
                  }}
                >
                  <h3>Medicines</h3>

                  <ul>
                    {result.recommendation.medicine.common.map(
                      (
                        medicine: string,
                        index: number
                      ) => (
                        <li key={index}>
                          {medicine}
                        </li>
                      )
                    )}
                  </ul>

                  <p
                    style={{
                      marginTop: "15px",
                      color: "#475569",
                    }}
                  >
                    <b>Note:</b>
                    {" "}
                    {
                      result
                        .recommendation
                        .medicine.note
                    }
                  </p>
                </div>

                {/* Precautions */}

                <div
                  style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "15px",
                  }}
                >
                  <h3>
                    Precautions
                  </h3>

                  <ul>
                    {result.recommendation.precautions.map(
                      (
                        item: string,
                        index: number
                      ) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Exercise */}

                <div
                  style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "15px",
                  }}
                >
                  <h3>Exercise</h3>

                  <p>
                    {
                      result.recommendation
                        .exercise
                    }
                  </p>
                </div>

                {/* Emergency */}

                <div
                  style={{
                    background: "#fee2e2",
                    padding: "25px",
                    borderRadius: "15px",
                  }}
                >
                  <h3
                    style={{
                      color: "#b91c1c",
                    }}
                  >
                    Emergency Advice
                  </h3>

                  <p>
                    {
                      result.recommendation
                        .emergency
                    }
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* FOOTER */}

        <div
          style={{
            textAlign: "center",
            padding: "30px",
            marginTop: "60px",
            color: "#64748b",
            fontSize: "16px",
            borderTop:
              "1px solid #cbd5e1",
          }}
        >
          © 2026 AI Health Assistant.
          All Rights Reserved.
          <br />
          Developed by
          Devendranath Kapa, Charan Sai, Sri Ram using
          Next.js, Flask & AI
          Technologies.
        </div>

      </div>
    </div>
  );
}