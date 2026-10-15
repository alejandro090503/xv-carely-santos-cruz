"use client";

const VENUES = [
  {
    titulo: "Misa de XV Años",
    lugar: "Parroquia María Auxiliadora",
    direccion: "José María Morelos 50, Chipitlán, 62070 Cuernavaca, Mor.",
    hora: "1:00 PM",
    maps: "https://www.google.com/maps/search/?api=1&query=Parroquia+Mar%C3%ADa+Auxiliadora+Jos%C3%A9+Mar%C3%ADa+Morelos+50+Chipitlan+Cuernavaca",
    embed: "https://maps.google.com/maps?q=Parroquia+Mar%C3%ADa+Auxiliadora,+Jos%C3%A9+Mar%C3%ADa+Morelos+50,+Chipitlan,+Cuernavaca&output=embed&hl=es&z=16",
  },
  {
    titulo: "Recepción",
    lugar: "Villa Trisara",
    direccion: "Privada Pistaches No. 16, Jardines de Acapantzingo, 62447 Cuernavaca, Mor.",
    hora: "3:00 PM",
    maps: "https://www.google.com/maps/search/?api=1&query=Villa+Trisara+Privada+Pistaches+16+Acapantzingo+Cuernavaca",
    embed: "https://maps.google.com/maps?q=Villa+Trisara,+Privada+Pistaches+16,+Jardines+de+Acapantzingo,+Cuernavaca&output=embed&hl=es&z=16",
  },
];

export default function Ubicacion() {
  return (
    <section style={{ padding: "64px 26px" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#1E3A8A",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.85,
      }}>
        Te esperamos en
      </p>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.1,
        marginBottom: 30,
      }}>
        Ubicación
      </h2>

      {VENUES.map((v) => (
        <div key={v.lugar} style={{
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
          background: "#f3e6c9 url('/imagenes/pergamino.jpg') center / cover",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderRadius: 2,
          border: "1px solid rgba(30,58,138,0.16)",
          boxShadow: "0 14px 56px rgba(20,40,107,0.10),inset 0 1px 0 rgba(255,255,255,0.96)",
        }}>
          {/* Marcos dobles art déco */}
          <div style={{ position: "absolute", inset: 9, border: "1px solid rgba(30,58,138,0.45)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 14, border: "1px solid rgba(30,58,138,0.18)", pointerEvents: "none" }} />
          {(["tl", "tr", "bl", "br"] as const).map((c) => (
            <svg key={c} viewBox="0 0 46 46" width="40" height="40" aria-hidden="true" style={{
              position: "absolute", pointerEvents: "none", color: "#1E3A8A", opacity: 0.8,
              top: c[0] === "t" ? 5 : undefined, bottom: c[0] === "b" ? 5 : undefined,
              left: c[1] === "l" ? 5 : undefined, right: c[1] === "r" ? 5 : undefined,
              transform: `scale(${c[1] === "r" ? -1 : 1},${c[0] === "b" ? -1 : 1})`,
            }}>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <path d="M2 18 L2 2 L18 2" /><path d="M6 22 L6 6 L22 6" opacity=".55" />
                <path d="M2 2 Q14 6 14 14 Q6 14 2 2" /><circle cx="14" cy="14" r="1.6" fill="currentColor" />
              </g>
            </svg>
          ))}
          {/* Sello postal con matasellos */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 22, right: 22, width: 54, height: 64, padding: 4, background: "#FFFDF6",
            transform: "rotate(6deg)", boxShadow: "0 2px 6px rgba(20,40,107,.25)",
            WebkitMask: "radial-gradient(circle 3px at 3px 3px, transparent 98%, #000) -3px -3px / 8px 8px",
            mask: "radial-gradient(circle 3px at 3px 3px, transparent 98%, #000) -3px -3px / 8px 8px",
          }}>
            <div style={{ width: "100%", height: "100%", background: "#1E3A8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/imagenes/op-jolly.png" alt="" style={{ width: "80%", filter: "brightness(0) invert(1)" }} />
            </div>
          </div>
          <div aria-hidden="true" style={{
            position: "absolute", top: 40, right: 56, width: 52, height: 52, borderRadius: "50%",
            border: "1.5px solid rgba(20,40,107,.55)", transform: "rotate(-12deg)", fontSize: 8.5, lineHeight: 1.25,
            display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
            fontFamily: "var(--font-typewriter), monospace", color: "rgba(20,40,107,.75)", pointerEvents: "none",
          }}>07·XI<br />2026</div>

          {/* Barra lateral izquierda */}
          <div style={{
            position: "absolute",
            left: 0,
            top: "12%",
            bottom: "12%",
            width: 2.5,
            background: "linear-gradient(to bottom,transparent,#4A7BB7 25%,#1E3A8A 55%,#a9c0d9 80%,transparent)",
            opacity: 0.52,
          }} />

          <div style={{ padding: "34px 28px 0", textAlign: "center" }}>
            {/* Ícono PIN */}
            <div style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              margin: "0 auto 16px",
              background: "linear-gradient(135deg,rgba(30,58,138,0.14),rgba(30,58,138,0.26))",
              border: "1.5px solid rgba(30,58,138,0.30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(20,40,107,0.13)",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#1E3A8A">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>

            <div className="gold-shine" style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: 42,
              lineHeight: 1.15,
              marginBottom: 10,
            }}>
              {v.titulo}
            </div>

            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 700,
              fontSize: 24,
              color: "#131f4d",
              letterSpacing: 1,
              lineHeight: 1.3,
              marginBottom: 8,
            }}>
              {v.lugar}
            </div>

            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 15,
              color: "rgba(19,31,77,.65)",
              letterSpacing: 0.4,
              lineHeight: 1.75,
              marginBottom: 8,
            }}>
              {v.direccion}
            </div>

            <div style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#14286b",
              letterSpacing: 2,
              marginBottom: 4,
            }}>
              {v.hora}
            </div>

            <div style={{
              width: 48,
              height: 1,
              margin: "18px auto 22px",
              background: "linear-gradient(90deg,transparent,#1E3A8A,transparent)",
              opacity: 0.32,
            }} />
          </div>

          <div style={{ textAlign: "center", padding: "0 22px 26px" }}>
            <a
              href={v.maps}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "14px 32px",
                background: "linear-gradient(135deg,#1E3A8A,#14286b)",
                color: "#FFFFFF",
                borderRadius: 30,
                fontFamily: "var(--font-cormorant), serif",
                fontSize: 14,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 3,
                textDecoration: "none",
                transition: "opacity .3s,transform .3s",
                boxShadow: "0 4px 16px rgba(20,40,107,0.30)",
              }}
            >
              Cómo Llegar
            </a>
          </div>

          {/* Mapa con marco vintage */}
          <div style={{
            position: "relative", margin: "0 18px 22px", aspectRatio: "4 / 3",
            border: "1px solid rgba(30,58,138,0.55)", background: "#f3e6c9",
            boxShadow: "inset 0 0 0 5px #f3e6c9, inset 0 0 0 6px rgba(30,58,138,0.35)",
          }}>
            <iframe
              style={{
                position: "absolute", inset: 9, width: "calc(100% - 18px)", height: "calc(100% - 18px)",
                border: 0, display: "block", filter: "sepia(.35) saturate(.8) contrast(1.02)",
              }}
              src={v.embed}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación: ${v.lugar}`}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
