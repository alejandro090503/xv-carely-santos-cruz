"use client";
import { useEffect, useRef, useState } from "react";

/* Lluvia de sobres (mecánica de boda-jeffersson-y-vanessa) en versión vintage + One Piece:
   caen sobres de pergamino con estampilla y monedas de berry (฿); cuando la sección
   queda centrada deja de llover y aterriza un sobre con sello de cera plateado CSC
   y estampilla de la bandera pirata. Al tocarlo se abre. */
type Gota = { id: number; left: number; w: number; dur: number; dx: number; rot: number; berry: boolean };

export default function LluviaSobres() {
  const secRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const [gotas, setGotas] = useState<Gota[]>([]);
  const [lloviendo, setLloviendo] = useState(true);
  const [aterrizo, setAterrizo] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!lloviendo) return;
    const nueva = () => {
      const g: Gota = {
        id: idRef.current++, left: Math.random() * 100, w: 18 + Math.random() * 16, dur: 5 + Math.random() * 4,
        dx: (Math.random() - 0.5) * 70, rot: (Math.random() - 0.5) * 160, berry: Math.random() < 0.3,
      };
      setGotas((gs) => [...gs.slice(-17), g]);
    };
    for (let i = 0; i < 7; i++) setTimeout(nueva, i * 260);
    const t = setInterval(nueva, 520);
    return () => clearInterval(t);
  }, [lloviendo]);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLloviendo(false); setTimeout(() => setAterrizo(true), 150); io.disconnect(); }
    }, { rootMargin: "-40% 0px -40% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ink = "#14286b";
  return (
    <div ref={secRef} style={{
      position: "relative", width: "100%", textAlign: "center", padding: "30px 18px 28px", overflow: "hidden",
      background: "#f3e6c9 url('/imagenes/pergamino.jpg') center / cover",
      border: "1px solid rgba(30,58,138,0.35)", boxShadow: "0 10px 30px rgba(20,40,107,0.14), inset 0 0 50px rgba(120,80,30,0.22)",
    }}>
      <div style={{ position: "absolute", inset: 8, border: "1px solid rgba(30,58,138,0.30)", pointerEvents: "none" }} />

      {/* Lluvia */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", opacity: lloviendo ? 1 : 0, transition: "opacity 1.1s ease" }}>
        {gotas.map((g) => (
          <div key={g.id} style={{
            position: "absolute", top: -46, left: `${g.left}%`, width: g.w,
            animation: `lsCae ${g.dur}s linear forwards`,
            ["--dx" as string]: `${g.dx}px`, ["--rot" as string]: `${g.rot}deg`,
          } as React.CSSProperties}>
            {g.berry ? (
              <svg viewBox="0 0 24 24" width={g.w * 0.8} height={g.w * 0.8}>
                <circle cx="12" cy="12" r="10.5" fill="#E4E6EA" stroke="#6E7581" strokeWidth="1.3" />
                <text x="12" y="16.5" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="13" fill={ink}>฿</text>
              </svg>
            ) : (
              <svg viewBox="0 0 34 24" width={g.w} height={g.w * 24 / 34}>
                <rect x="1" y="1" width="32" height="22" rx="1.5" fill="#efe1c4" stroke={ink} strokeWidth="1.1" />
                <path d="M1 1 L17 13 L33 1" fill="none" stroke={ink} strokeWidth="1.1" strokeLinejoin="round" />
                <rect x="24" y="3" width="7" height="8" fill="#1E3A8A" stroke="#fff" strokeWidth=".8" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "var(--font-typewriter), monospace", fontSize: 14, letterSpacing: 3, color: ink, marginBottom: 2 }}>
          CORREO PIRATA
        </p>
        <h3 className="gold-shine" style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: 44, lineHeight: 1.25, padding: "4px 20px 6px" }}>
          Lluvia de Sobres
        </h3>

        <button
          type="button"
          aria-label="Sobre — toca para abrir"
          aria-expanded={abierto}
          onClick={() => { if (aterrizo) setAbierto((o) => !o); }}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", margin: "18px auto 0", border: "none", background: "none",
            padding: 0, cursor: "pointer", opacity: aterrizo ? 1 : 0, WebkitTapHighlightColor: "transparent",
            animation: aterrizo ? "lsAterriza 1.15s cubic-bezier(.34,1.56,.64,1) both" : "none",
          }}
        >
          <div style={{
            position: "relative", width: "min(258px, 74vw)", aspectRatio: "260 / 200", perspective: 700,
            filter: "drop-shadow(0 10px 22px rgba(20,40,107,.25))",
            animation: aterrizo && !abierto ? "lsRespira 3.6s 1.2s ease-in-out infinite" : "none",
          }}>
            <svg viewBox="0 0 260 200" preserveAspectRatio="none" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }}>
              <defs>
                <pattern id="ls-papel" patternUnits="userSpaceOnUse" width="260" height="200">
                  <image href="/imagenes/pergamino.jpg" width="260" height="200" preserveAspectRatio="xMidYMid slice" />
                </pattern>
              </defs>
              <rect x="18" y="52" width="224" height="132" rx="3" fill="url(#ls-papel)" stroke="rgba(20,40,107,.55)" strokeWidth="1.4" />
              <path d="M18 184 L130 110 L242 184" stroke="rgba(20,40,107,.35)" strokeWidth="1" fill="none" />
              {/* Rayas de correo aéreo vintage */}
              <path d="M18 178 h224" stroke="#1E3A8A" strokeWidth="4" strokeDasharray="10 8" opacity=".55" />
              {/* Destinatario a máquina */}
              <text x="34" y="160" fontFamily="Courier New, monospace" fontSize="9" fill="#14286b" opacity=".8">PARA: CARELY · CUERNAVACA</text>
            </svg>
            {/* Estampilla con la bandera pirata */}
            <div aria-hidden="true" style={{
              position: "absolute", right: "11%", top: "33%", width: "15%", aspectRatio: "54 / 64", padding: 3, background: "#FFFDF6", zIndex: 1,
              transform: "rotate(5deg)", boxShadow: "0 1px 3px rgba(20,40,107,.3)",
              WebkitMask: "radial-gradient(circle 2.5px at 2.5px 2.5px, transparent 98%, #000) -2.5px -2.5px / 6.5px 6.5px",
              mask: "radial-gradient(circle 2.5px at 2.5px 2.5px, transparent 98%, #000) -2.5px -2.5px / 6.5px 6.5px",
            }}>
              <div style={{ width: "100%", height: "100%", background: "#1E3A8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/imagenes/op-jolly.png" alt="" style={{ width: "82%", filter: "brightness(0) invert(1)" }} />
              </div>
            </div>
            {/* Solapa */}
            <div aria-hidden="true" style={{
              position: "absolute", top: "26%", left: "6.9%", width: "86.2%", height: "43%", transformOrigin: "top center",
              transformStyle: "preserve-3d", backfaceVisibility: "hidden", transition: "transform .65s cubic-bezier(.4,0,.2,1)",
              transform: abierto ? "rotateX(-175deg)" : "none", zIndex: 2,
            }}>
              <svg viewBox="0 0 224 86" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                <path d="M0 0 L112 86 L224 0 Z" fill="#e8d6b0" stroke="rgba(20,40,107,.55)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Sello de cera plateado */}
            <svg viewBox="0 0 60 60" aria-hidden="true" style={{
              position: "absolute", top: "55%", left: "50%", width: "23%", zIndex: 3, transform: `translate(-50%,-50%) scale(${abierto ? 0.7 : 1})`,
              opacity: abierto ? 0 : 1, transition: "opacity .35s ease, transform .5s cubic-bezier(.4,0,.2,1)",
            }}>
              <defs>
                <radialGradient id="ls-cera" cx="38%" cy="32%" r="75%">
                  <stop offset="0%" stopColor="#F4F5F7" /><stop offset="45%" stopColor="#B9BEC6" /><stop offset="100%" stopColor="#6E7581" />
                </radialGradient>
              </defs>
              <path d="M30 2 C40 3 47 6 52 12 C57 18 59 24 58 31 C58 39 55 46 49 51 C43 56 37 58 30 58 C22 58 15 55 10 50 C5 45 2 38 2 30 C3 22 6 15 12 10 C17 5 23 2 30 2 Z" fill="url(#ls-cera)" />
              <circle cx="30" cy="30" r="20" fill="none" stroke="#6E7581" strokeWidth="1.2" opacity=".8" />
              <text x="30" y="35" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="700" fill="#4a505b">CSC</text>
            </svg>
          </div>

          <div aria-live="polite" style={{
            overflow: "hidden", maxHeight: abierto ? 320 : 0, opacity: abierto ? 1 : 0, marginTop: abierto ? 18 : 0,
            transition: "max-height .55s .3s ease, opacity .4s .38s ease, margin-top .4s ease",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "0 12px",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/imagenes/op-jolly.png" alt="" aria-hidden="true" style={{ width: 54, opacity: 0.9 }} />
            <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: 32, color: "#1E3A8A", lineHeight: 1.3 }}>
              Tu presencia es mi tesoro
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 500, fontSize: 18, color: "#131f4d", lineHeight: 1.65, maxWidth: 300 }}>
              Un sobre con tu bendición llenará mi corazón de alegría. El día del evento habrá un cofre donde podrás depositarlo.
            </p>
          </div>
        </button>
        <p style={{
          fontFamily: "var(--font-typewriter), monospace", fontSize: 14, letterSpacing: 3, color: ink, marginTop: 16,
          opacity: aterrizo && !abierto ? 1 : 0, transition: "opacity .5s ease",
          animation: aterrizo && !abierto ? "lsPulso 2.4s ease-in-out infinite" : "none",
        }}>
          TOCA PARA ABRIR
        </p>
      </div>
    </div>
  );
}
