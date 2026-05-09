"use client";

import Link from "next/link";

export default function Navbar() {

  return (
    <nav
      style={{
        background:
          "linear-gradient(to right,#0f172a,#1e293b)",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.15)",
        backdropFilter: "blur(10px)",
      }}
    >

      {/* LOGO */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >

        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            background:
              "linear-gradient(to right,#2563eb,#06b6d4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            boxShadow:
              "0 5px 15px rgba(37,99,235,0.4)",
          }}
        >
          D
        </div>

        <div>

          <h2
            style={{
              color: "white",
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            DSC
          </h2>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              fontSize: "13px",
            }}
          >
            Smart Healthcare Platform
          </p>

        </div>

      </div>

      {/* NAVIGATION */}

      <div
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
        }}
      >

        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            transition: "0.3s",
            fontWeight: "500",
            background:
              "rgba(255,255,255,0.05)",
          }}
        >
          Home
        </Link>

        <Link
          href="/about"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            transition: "0.3s",
            fontWeight: "500",
            background:
              "rgba(255,255,255,0.05)",
          }}
        >
          About
        </Link>

        <Link
          href="/upload"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            transition: "0.3s",
            fontWeight: "500",
            background:
              "linear-gradient(to right,#2563eb,#1d4ed8)",
            boxShadow:
              "0 5px 15px rgba(37,99,235,0.4)",
          }}
        >
          OCR Upload
        </Link>

      </div>

    </nav>
  );
}