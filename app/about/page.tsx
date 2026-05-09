import Navbar from "../../components/navbar";

export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #e0f2fe, #f8fafc, #dbeafe)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px 40px",
        }}
      >
        <h1
          style={{
            fontSize: "55px",
            color: "#0f172a",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          About AI Health Assistant
        </h1>

        <p
          style={{
            maxWidth: "850px",
            margin: "auto",
            fontSize: "22px",
            lineHeight: "40px",
            color: "#334155",
          }}
        >
          AI Health Assistant is an advanced
          healthcare support platform that helps
          users identify possible diseases based
          on symptoms using intelligent rule-based
          prediction systems and OCR prescription
          analysis.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >

        {/* CARD 1 */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            transition: "0.3s",
          }}
        >
          <h2
            style={{
              color: "#2563eb",
              marginBottom: "20px",
            }}
          >
            Disease Prediction
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "32px",
              color: "#475569",
            }}
          >
            Users can enter symptoms such as
            fever, cough, headache, vomiting,
            sneezing, chest pain and more.
            The system intelligently predicts
            possible diseases like:
          </p>

          <ul
            style={{
              marginTop: "20px",
              lineHeight: "35px",
              fontSize: "17px",
              color: "#0f172a",
            }}
          >
            <li>Malaria</li>
            <li>Dengue</li>
            <li>Diabetes</li>
            <li>Pneumonia</li>
            <li>Common Cold</li>
            <li>Urinary Tract Infection</li>
          </ul>
        </div>

        {/* CARD 2 */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#16a34a",
              marginBottom: "20px",
            }}
          >
            OCR Prescription Scanner
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "32px",
              color: "#475569",
            }}
          >
            The project supports OCR
            prescription scanning using
            Tesseract OCR and OpenCV.
          </p>

          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              lineHeight: "32px",
              color: "#475569",
            }}
          >
            Users can upload prescription
            images and the system extracts:
          </p>

          <ul
            style={{
              marginTop: "20px",
              lineHeight: "35px",
              fontSize: "17px",
              color: "#0f172a",
            }}
          >
            <li>Medicine Names</li>
            <li>Drug Usage Information</li>
            <li>Warnings</li>
            <li>Prescription Text</li>
          </ul>
        </div>

        {/* CARD 3 */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#9333ea",
              marginBottom: "20px",
            }}
          >
            Technologies Used
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {[
              "Next.js",
              "React",
              "Flask",
              "Python",
              "OpenCV",
              "Tesseract OCR",
              "OpenFDA API",
              "Axios",
              "REST API",
            ].map((tech, index) => (
              <div
                key={index}
                style={{
                  background: "#dbeafe",
                  color: "#1e3a8a",
                  padding: "12px 18px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "30px",
              fontSize: "18px",
              lineHeight: "32px",
              color: "#475569",
            }}
          >
            The project combines AI concepts,
            healthcare support, OCR technology,
            NLP symptom analysis, and modern
            web development to create a smart
            healthcare assistant.
          </p>
        </div>
      </div>

      {/* FOOTER */}
     <div
  style={{
    textAlign: "center",
    padding: "25px",
    marginTop: "50px",
    color: "#64748b",
    fontSize: "16px",
    borderTop: "1px solid #cbd5e1"
  }}
>
  © 2026 AI Health Assistant. All Rights Reserved.  
  Developed by Devendranath Kapa, Charan Sai, Sri Ram using Next.js, Flask & AI Technologies.
</div>
    </div>
  );
}