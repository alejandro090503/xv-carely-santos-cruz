"use client";

export default function Hospedaje() {
  return (
    <section style={{ padding: "64px 26px" }}>
      <p
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: 14,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: "#1E3A8A",
          textAlign: "center",
          marginBottom: 8,
          opacity: 0.85,
        }}
      >
        Para tu estancia
      </p>
      <h2
        className="gold-shine"
        style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: 50,
          textAlign: "center",
          lineHeight: 1.1,
          marginBottom: 14,
        }}
      >
        Hospedaje
      </h2>
      <p
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: 15,
          textAlign: "center",
          color: "rgba(19,31,77,0.72)",
          maxWidth: 320,
          margin: "0 auto 34px",
          lineHeight: 1.6,
        }}
      >
        Si vienes de fuera, te recomendamos esta opción de hospedaje cercana al evento.
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(168,173,182,0.45)",
            boxShadow: "0 12px 34px rgba(20,40,107,0.20)",
            marginBottom: 22,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imagenes/hospedaje-vee-quiva.jpg"
            alt="Gila River Resorts & Casinos — Vee Quiva"
            width={200}
            height={200}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 600,
            fontSize: 21,
            color: "#14286b",
            marginBottom: 6,
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          Gila River Resorts &amp; Casinos — Vee Quiva
        </div>
        <div
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 15,
            color: "rgba(19,31,77,0.65)",
            marginBottom: 20,
          }}
        >
          Laveen, Arizona
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="https://playatgila.com/resorts/vee-quiva/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "linear-gradient(135deg,#1E3A8A,#14286b)",
              color: "#FFFFFF",
              borderRadius: 30,
              fontFamily: "var(--font-cormorant), serif",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(20,40,107,0.30)",
            }}
          >
            Reservar
          </a>
          <a
            href="https://share.google/DU51dq0JIJm3GBfTN"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "transparent",
              border: "1.5px solid rgba(168,173,182,0.55)",
              color: "#14286b",
              borderRadius: 30,
              fontFamily: "var(--font-cormorant), serif",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              textDecoration: "none",
            }}
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
