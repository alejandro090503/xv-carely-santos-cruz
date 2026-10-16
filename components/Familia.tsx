"use client";

export default function Familia() {
  return (
    <section style={{ padding: "64px 26px" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#14286b",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.95,
      }}>
        Con la bendición de Dios y de
      </p>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.25,
        marginBottom: 30,
        padding: "6px 24px 10px",
        overflow: "visible",
        display: "block",
      }}>
        Mi Familia
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "stretch" }}>

        {/* Padres */}
        <div className="levita" style={{ animationDelay: "0.6s",
          width: "100%",
          textAlign: "center",
          padding: "30px 26px",
          background: "linear-gradient(145deg,rgba(255,255,255,0.82),rgba(251,244,230,0.95))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(30,58,138,0.13)",
          boxShadow: "0 6px 30px rgba(20,40,107,0.07),inset 0 1px 0 rgba(255,255,255,0.88)",
          borderRadius: "24px 24px 0 0",
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            margin: "0 auto 14px",
            background: "linear-gradient(135deg,rgba(30,58,138,0.14),rgba(169,192,217,0.26))",
            border: "1.5px solid rgba(30,58,138,0.32)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(20,40,107,0.11)",
          }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1E3A8A" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#14286b",
            marginBottom: 14,
            opacity: 1,
          }}>
            Mis Padres
          </p>
          <div style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: 21,
            color: "#131f4d",
            lineHeight: 1.85,
          }}>
            Elizabeth Cruz Castañeda
            <span style={{
              display: "block",
              fontStyle: "italic",
              fontSize: 30,
              color: "#1E3A8A",
              opacity: 0.45,
              lineHeight: 1.1,
              margin: "4px 0",
            }}>&amp;</span>
            Carlos Santos Carranza
          </div>

          {/* Subsección: hermano */}
          <div style={{ width: 60, height: 1, margin: "22px auto 18px", background: "linear-gradient(90deg,transparent,rgba(30,58,138,.45),transparent)" }} />
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#14286b",
            marginBottom: 10,
          }}>
            Mi Hermano
          </p>
          <div style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: 21,
            color: "#131f4d",
            lineHeight: 1.6,
          }}>
            Roberto Carlos Santos Cruz
          </div>
        </div>

        {/* Divisor */}
        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 46,
          position: "relative",
          background: "rgba(255,255,255,0.55)",
          borderLeft: "1px solid rgba(30,58,138,0.13)",
          borderRight: "1px solid rgba(30,58,138,0.13)",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(30,58,138,0.18),transparent)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(30,58,138,0.18),transparent)" }} />
          <svg viewBox="0 0 100 26" fill="none" style={{ width: 100, height: 26 }}>
            <line x1="0" y1="13" x2="32" y2="13" stroke="#1E3A8A" strokeWidth="0.7" opacity="0.32"/>
            <path d="M32 13 Q38 5 44 13" stroke="#1E3A8A" strokeWidth="0.8" fill="none" opacity="0.44"/>
            <path d="M50 4 L57 13 L50 22 L43 13 Z" fill="rgba(30,58,138,0.10)" stroke="#1E3A8A" strokeWidth="0.9" opacity="0.48"/>
            <circle cx="50" cy="13" r="3" fill="rgba(168,173,182,0.35)" stroke="#A8ADB6" strokeWidth="0.6" opacity="0.70"/>
            <path d="M56 13 Q62 5 68 13" stroke="#1E3A8A" strokeWidth="0.8" fill="none" opacity="0.44"/>
            <line x1="68" y1="13" x2="100" y2="13" stroke="#1E3A8A" strokeWidth="0.7" opacity="0.32"/>
          </svg>
        </div>

        {/* Hermanos */}
        <div className="levita" style={{ animationDelay: "1.2s",
          width: "100%",
          textAlign: "center",
          padding: "30px 26px",
          background: "linear-gradient(145deg,rgba(255,255,255,0.82),rgba(251,244,230,0.95))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(30,58,138,0.13)",
          boxShadow: "0 6px 30px rgba(20,40,107,0.07),inset 0 1px 0 rgba(255,255,255,0.88)",
          borderRadius: "0 0 24px 24px",
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            margin: "0 auto 14px",
            background: "linear-gradient(135deg,rgba(30,58,138,0.14),rgba(169,192,217,0.26))",
            border: "1.5px solid rgba(30,58,138,0.32)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(20,40,107,0.11)",
          }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1E3A8A" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="3.2"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16.5 3.9a4 4 0 0 1 0 6.2"/>
            </svg>
          </div>
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#14286b",
            marginBottom: 14,
            opacity: 1,
          }}>
            Mis Padrinos
          </p>
          <div style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 500,
            fontSize: 21,
            color: "#131f4d",
            lineHeight: 1.85,
          }}>
            Tania Eunice Leyva Cruz
            <span style={{
              display: "block",
              fontStyle: "italic",
              fontSize: 30,
              color: "#1E3A8A",
              opacity: 0.45,
              lineHeight: 1.1,
              margin: "4px 0",
            }}>&amp;</span>
            Agustín Rendón Solis
          </div>
        </div>

      </div>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 20,
        lineHeight: 1.6,
        color: "#14286b",
        textAlign: "center",
        maxWidth: 330,
        margin: "30px auto 0",
      }}>
        tengo el honor de invitarte a celebrar mis XV años
      </p>
    </section>
  );
}
