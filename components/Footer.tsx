"use client";

export default function Footer() {
  return (
    <footer style={{ padding: "50px 20px", textAlign: "center" }}>
      <div className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 200,
        lineHeight: 1.4,
        padding: "28px 60px 28px 48px",
        overflow: "visible",
        display: "inline-block",
      }}>
        C
      </div>
      <div style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 15,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: "#1E3A8A",
        marginTop: 6,
      }}>
        VII · Noviembre · MMXXVI
      </div>
      <div style={{
        width: 48,
        height: 1,
        margin: "18px auto 14px",
        background: "linear-gradient(90deg,transparent,#1E3A8A,transparent)",
        opacity: 0.35,
      }} />
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontSize: 13,
        color: "rgba(19,31,77,0.40)",
        letterSpacing: 1,
      }}>
        Con mucho cariño por{" "}
        <a
          href="https://www.instagram.com/elysium.invitaciones"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1E3A8A", textDecoration: "none" }}
        >
          @elysium.invitaciones
        </a>
      </p>
    </footer>
  );
}
