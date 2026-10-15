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
          background: "linear-gradient(158deg,rgba(255,255,255,0.92),rgba(251,244,230,0.97))",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderRadius: 28,
          border: "1px solid rgba(30,58,138,0.16)",
          boxShadow: "0 14px 56px rgba(20,40,107,0.10),inset 0 1px 0 rgba(255,255,255,0.96)",
        }}>
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

          <iframe
            style={{
              width: "100%",
              height: 215,
              border: 0,
              display: "block",
              borderRadius: "0 0 28px 28px",
              opacity: 0.92,
              filter: "saturate(0.85)",
            }}
            src={v.embed}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Ubicación: ${v.lugar}`}
          />
        </div>
      ))}
    </section>
  );
}
