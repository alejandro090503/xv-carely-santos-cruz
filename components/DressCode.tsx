"use client";

export default function DressCode() {
  return (
    <section style={{ padding: "64px 26px" }}>
      <div style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(155deg,#FBF4E6 0%,#F3EADB 55%,#FBF4E6 100%)",
        borderRadius: 28,
        padding: "36px 24px 32px",
        border: "1px solid rgba(110,117,129,0.30)",
        boxShadow: "0 18px 60px rgba(30,58,138,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}>
        {/* Luces de fondo suaves */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at 18% 18%,rgba(30,58,138,0.10) 0%,transparent 60%), radial-gradient(ellipse at 82% 82%,rgba(168,173,182,0.14) 0%,transparent 60%)",
        }} />
        {/* Línea superior dorada */}
        <div style={{
          position: "absolute",
          top: -1,
          left: "18%",
          right: "18%",
          height: 2,
          background: "linear-gradient(90deg,transparent,#1E3A8A 30%,#A8ADB6 70%,transparent)",
          opacity: 0.75,
        }} />

        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#14286b",
          textAlign: "center",
          marginBottom: 4,
          position: "relative",
          opacity: 0.85,
        }}>
          Etiqueta
        </p>
        <h2 className="gold-shine" style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: 50,
          textAlign: "center",
          lineHeight: 1.1,
          marginBottom: 6,
          position: "relative",
          filter: "drop-shadow(0 2px 14px rgba(30,58,138,0.25))",
        }}>
          Dress Code
        </h2>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#14286b",
          textAlign: "center",
          marginBottom: 22,
          position: "relative",
          opacity: 0.92,
        }}>
          Formal
        </p>

        {/* Caballeros / Damas */}
        <div style={{ display: "grid", gridTemplateColumns: "120px 120px", justifyContent: "center", justifyItems: "center", columnGap: 24, marginTop: 10, marginBottom: 28, position: "relative" }}>
          <div style={{ textAlign: "center" }}>
            <img src="/imagenes/caballero.png" alt="Caballero, traje oscuro formal" width={57} height={170} style={{ display: "block", margin: "0 auto", height: 170, width: 57 }} />
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#14286b",
              marginTop: 8,
            }}>Caballeros</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <img src="/imagenes/dama.png" alt="Dama, vestido largo formal" width={71} height={170} style={{ display: "block", margin: "0 auto", height: 170, width: 71 }} />
            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#14286b",
              marginTop: 8,
            }}>Damas</div>
          </div>
        </div>

        {/* Colores a evitar (el azul rey es de la quinceañera) */}
        <div style={{ position: "relative", textAlign: "center", paddingTop: 22, borderTop: "1px solid rgba(30,58,138,0.18)" }}>
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#14286b",
            marginBottom: 12,
          }}>
            Colores a evitar
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 92px)", justifyContent: "center", justifyItems: "center", columnGap: 6 }}>
            {[{ c: "#1F3FBF", n: "Azul rey" }, { c: "#87CEEB", n: "Azul cielo" }, { c: "#0B1F4D", n: "Azul marino" }].map((x) => (
              <div key={x.c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", background: x.c, border: "2px solid #fff", boxShadow: "0 0 0 1px rgba(110,117,129,0.55), 0 4px 12px rgba(20,40,107,0.18)" }}>
                  <div style={{ position: "absolute", left: "50%", top: -4, bottom: -4, width: 2, background: "#6E7581", transform: "translateX(-50%) rotate(45deg)" }} />
                </div>
                <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 16, color: "#131f4d" }}>{x.n}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 500, fontSize: 17, color: "#131f4d", marginTop: 12, lineHeight: 1.5 }}>
            Reservados para la quinceañera
          </p>
        </div>

      </div>
    </section>
  );
}
