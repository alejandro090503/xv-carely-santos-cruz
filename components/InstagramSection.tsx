"use client";

import { useEffect, useState } from "react";

/* Álbum de Elysium: el QR abre /album → panel-invitados.vercel.app/subir/xv-carely-santos-cruz */
const FECHA_EVENTO = "2026-11-07";

export default function InstagramSection() {
  // Se desbloquea solo el día del evento (la base además rechaza fotos antes de tiempo)
  const [bloqueado, setBloqueado] = useState(true);
  useEffect(() => {
    const p = FECHA_EVENTO.split("-");
    const abre = new Date(+p[0], +p[1] - 1, +p[2], 0, 0, 0);
    setBloqueado(new Date() < abre);
  }, []);

  return (
    <section style={{ padding: "64px 26px" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#14286b",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.9,
      }}>
        Comparte el momento
      </p>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.1,
        marginBottom: 30,
      }}>
        Álbum de fotos
      </h2>

      <div style={{
        background: "linear-gradient(145deg,rgba(255,255,255,0.85),rgba(251,244,230,0.95))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 26,
        border: "1px solid rgba(30,58,138,0.16)",
        boxShadow: "0 8px 36px rgba(20,40,107,0.09)",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Barra superior */}
        <div style={{
          height: 2,
          background: "linear-gradient(90deg,transparent,#1E3A8A 30%,#A8ADB6 70%,transparent)",
          opacity: 0.55,
        }} />

        <div style={{ padding: "34px 26px 32px" }}>
          {/* Mensaje principal */}
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 18,
            color: "#14286b",
            lineHeight: 1.6,
            letterSpacing: 0.4,
            marginBottom: 24,
            maxWidth: 320,
            margin: "0 auto 24px",
          }}>
            Ayúdanos a guardar cada momento: sube aquí las fotos que tomes durante el evento.
          </p>

          <div className={"album-qr" + (bloqueado ? " bloqueado" : "")} data-fecha={FECHA_EVENTO}>
          {/* Caja del QR con marco dorado */}
          <div style={{
            display: "inline-block",
            padding: 14,
            background: "#FBF4E6",
            border: "1px solid rgba(110,117,129,0.45)",
            borderRadius: 18,
            boxShadow: "0 4px 22px rgba(110,117,129,0.20), inset 0 0 0 4px rgba(255,255,255,0.7)",
            position: "relative",
            marginBottom: 0,
          }}>
            {/* Esquinas decorativas doradas */}
            {(["tl","tr","bl","br"] as const).map((corner) => {
              const pos: React.CSSProperties =
                corner === "tl" ? { top: -1, left: -1 } :
                corner === "tr" ? { top: -1, right: -1, transform: "rotate(90deg)", transformOrigin: "top right" } :
                corner === "br" ? { bottom: -1, right: -1, transform: "rotate(180deg)", transformOrigin: "bottom right" } :
                                  { bottom: -1, left: -1, transform: "rotate(270deg)", transformOrigin: "bottom left" };
              return (
                <div key={corner} style={{ position: "absolute", ...pos }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M2 2 L2 11" stroke="#6E7581" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
                    <path d="M2 2 L11 2" stroke="#6E7581" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
                    <circle cx="2" cy="2" r="1.8" fill="#6E7581" opacity="1"/>
                  </svg>
                </div>
              );
            })}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qr-album.png"
              alt="Código QR del álbum de fotos"
              width={220}
              height={220}
              style={{ display: "block", borderRadius: 8 }}
            />
          </div>

          <a className="album-btn" href="/album">Subir mis fotos</a>
          </div>

          {bloqueado && (
            <p className="album-aviso" style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "#131f4d",
              letterSpacing: 0.4,
              lineHeight: 1.55,
              marginBottom: 0,
              marginTop: 18,
            }}>
              El álbum de fotos se habilita el día del evento. Regresa aquí y sube todas tus fotos de la noche ✨
            </p>
          )}

          <div style={{
            width: 40,
            height: 1,
            margin: "20px auto 14px",
            background: "linear-gradient(90deg,transparent,rgba(30,58,138,0.45),transparent)",
          }} />

          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 13,
            color: "rgba(19,31,77,0.50)",
            letterSpacing: 1,
            fontStyle: "italic",
          }}>
            Con mucho cariño por{" "}
            <a
              href="https://www.instagram.com/elysium.invitaciones"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1E3A8A", textDecoration: "none", fontWeight: 600 }}
            >
              @elysium.invitaciones
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
