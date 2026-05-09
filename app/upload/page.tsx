"use client";

import { useState } from "react";
import axios from "axios";

import Navbar from "../../components/navbar";

export default function Upload() {

  const [file, setFile] = useState<any>(null);

  const [result, setResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const uploadImage = async () => {

    if (!file) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();

    formData.append("image", file);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );

      setResult(response.data);

    } catch (error) {

      alert("Upload failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to right,#eff6ff,#f8fafc)",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "60px 30px",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >

          <h1
            style={{
              fontSize: "55px",
              fontWeight: "bold",
              color: "#0f172a",
            }}
          >
            OCR Prescription Analysis
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              maxWidth: "800px",
              margin: "20px auto",
              lineHeight: "35px",
            }}
          >
            Upload medical prescriptions and
            extract medicine names using
            Tesseract OCR and AI-powered
            medicine intelligence.
          </p>

        </div>

        {/* MAIN CARD */}

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "25px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          {/* UPLOAD BOX */}

          <div
            style={{
              border:
                "2px dashed #93c5fd",
              borderRadius: "20px",
              padding: "50px",
              textAlign: "center",
              background: "#f8fafc",
            }}
          >

            <h2
              style={{
                color: "#2563eb",
                fontSize: "30px",
              }}
            >
              Upload Prescription
            </h2>

            <p
              style={{
                marginTop: "10px",
                color: "#64748b",
                fontSize: "18px",
              }}
            >
              Supported formats:
              PNG, JPG, JPEG
            </p>

            <input
              type="file"
              onChange={(e: any) =>
                setFile(
                  e.target.files[0]
                )
              }
              style={{
                marginTop: "30px",
                fontSize: "16px",
              }}
            />

            {file && (

              <div
                style={{
                  marginTop: "20px",
                  color: "#0f172a",
                  fontWeight: "bold",
                }}
              >
                Selected File:
                {" "}
                {file.name}
              </div>
            )}

            <button
              onClick={uploadImage}
              style={{
                marginTop: "35px",
                width: "100%",
                padding: "18px",
                background:
                  "linear-gradient(to right,#2563eb,#1d4ed8)",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              {loading
                ? "Analyzing..."
                : "Upload & Analyze"}
            </button>

          </div>

          {/* RESULT SECTION */}

          {result && (

            <div
              style={{
                marginTop: "50px",
              }}
            >

              <h2
                style={{
                  fontSize: "35px",
                  color: "#0f172a",
                  marginBottom: "25px",
                }}
              >
                Analysis Result
              </h2>

              {/* EXTRACTED TEXT */}

              <div
                style={{
                  background: "#f8fafc",
                  padding: "25px",
                  borderRadius: "18px",
                  marginBottom: "30px",
                  border:
                    "1px solid #e2e8f0",
                }}
              >

                <h3
                  style={{
                    color: "#2563eb",
                    marginBottom: "15px",
                    fontSize: "25px",
                  }}
                >
                  Extracted Text
                </h3>

                <p
                  style={{
                    lineHeight: "32px",
                    color: "#334155",
                    fontSize: "17px",
                    whiteSpace:
                      "pre-wrap",
                  }}
                >
                  {
                    result.extracted_text
                  }
                </p>

              </div>

              {/* MEDICINES */}

              <div
                style={{
                  background: "#eff6ff",
                  padding: "25px",
                  borderRadius: "18px",
                  border:
                    "1px solid #bfdbfe",
                }}
              >

                <h3
                  style={{
                    color: "#1d4ed8",
                    marginBottom: "20px",
                    fontSize: "25px",
                  }}
                >
                  Detected Medicines
                </h3>

                {result.medicines.length >
                0 ? (

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                      gap: "15px",
                    }}
                  >

                    {result.medicines.map(
                      (
                        med: string,
                        index: number
                      ) => (

                        <div
                          key={index}
                          style={{
                            background:
                              "white",
                            padding:
                              "18px",
                            borderRadius:
                              "12px",
                            textAlign:
                              "center",
                            fontWeight:
                              "bold",
                            color:
                              "#0f172a",
                            boxShadow:
                              "0 5px 10px rgba(0,0,0,0.05)",
                          }}
                        >
                          {med}
                        </div>
                      )
                    )}

                  </div>

                ) : (

                  <p
                    style={{
                      color: "#64748b",
                    }}
                  >
                    No medicines detected.
                  </p>
                )}

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
          Developed by Devendranath Kapa,
          Charan Sai, Sri Ram using
          Next.js, Flask & AI Technologies.
        </div>

      </div>
    </div>
  );
}