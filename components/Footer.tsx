"use client";

/* Pie al estilo de las XV recientes (xv-joselyn-verdejo-lucero): foto final,
   nombre en script, fecha, lugar con despedida y crédito con icono de Instagram.
   Versión vintage: la foto va como polaroid sujeta con cinta, sobre pergamino. */
export default function Footer() {
  const ink = "#14286b";
  return (
    <footer style={{ padding: "56px 22px 46px", textAlign: "center", position: "relative" }}>
      {/* Foto final tipo polaroid */}
      <div className="levita" style={{ display: "inline-block", marginBottom: 26 }}>
        <div style={{
          position: "relative", background: "#FFFDF6", padding: "12px 12px 30px", width: 250,
          boxShadow: "0 18px 40px rgba(20,40,107,0.25), 0 0 0 1px rgba(110,117,129,0.3)", transform: "rotate(-2.5deg)",
        }}>
          {/* Cinta adhesiva */}
          <div aria-hidden="true" style={{
            position: "absolute", top: -12, left: "50%", width: 90, height: 24, marginLeft: -45, transform: "rotate(3deg)",
            background: "rgba(247,231,206,0.75)", boxShadow: "0 1px 3px rgba(0,0,0,.12)",
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imagenes/foto3.jpg" alt="Carely" style={{
            width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "50% 28%", display: "block",
            filter: "sepia(.18) saturate(.95)",
          }} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: 0.85 }}>
        <span style={{ width: 46, height: 1, background: "linear-gradient(90deg,transparent,#1E3A8A)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/imagenes/op-jolly.png" alt="" aria-hidden="true" style={{ width: 34 }} />
        <span style={{ width: 46, height: 1, background: "linear-gradient(90deg,#1E3A8A,transparent)" }} />
      </div>

      <div className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive", fontSize: 72, lineHeight: 1.35, padding: "8px 40px 4px",
      }}>
        Carely
      </div>
      <p style={{
        fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 18, letterSpacing: 4,
        textTransform: "uppercase", color: ink, marginTop: 2,
      }}>
        7 · Noviembre · 2026
      </p>
      <p style={{
        fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 18,
        color: "#131f4d", marginTop: 10, lineHeight: 1.6,
      }}>
        Cuernavaca · Morelos<br />Con cariño, Carely
      </p>

      <div style={{ width: 60, height: 1, margin: "24px auto 16px", background: "linear-gradient(90deg,transparent,#1E3A8A,transparent)", opacity: 0.5 }} />
      <a
        href="https://www.instagram.com/elysium.invitaciones/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 7, color: "#1E3A8A", textDecoration: "none",
          fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 15,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span>Diseño por @elysium.invitaciones</span>
      </a>
    </footer>
  );
}
