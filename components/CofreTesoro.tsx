"use client";
import { useState } from "react";

/* Mesa de regalos temática: cofre del tesoro pirata. Al tocarlo se abre la tapa,
   salen monedas de berry (฿) y aparece la sugerencia de regalo. */
const MONEDAS = [
  { x: -70, y: -120, r: -30, d: 0 }, { x: -30, y: -150, r: 20, d: 0.05 }, { x: 10, y: -165, r: -10, d: 0.1 },
  { x: 50, y: -140, r: 35, d: 0.03 }, { x: 80, y: -105, r: -20, d: 0.08 }, { x: -95, y: -80, r: 15, d: 0.12 },
  { x: 100, y: -70, r: -35, d: 0.14 },
];

export default function CofreTesoro() {
  const [abierto, setAbierto] = useState(false);
  const ink = "#14286b";
  return (
    <div style={{
      position: "relative", width: "100%", textAlign: "center", padding: "30px 20px 26px", overflow: "hidden",
      background: "linear-gradient(rgba(255,252,245,.74),rgba(255,252,245,.74)), #fbf6ea url('/imagenes/pergamino.jpg') center / cover",
      border: "1px solid rgba(30,58,138,0.35)", boxShadow: "0 10px 30px rgba(20,40,107,0.14), inset 0 0 40px rgba(120,80,30,0.08)",
    }}>
      <div style={{ position: "absolute", inset: 8, border: "1px solid rgba(30,58,138,0.30)", pointerEvents: "none" }} />
      <p style={{ fontFamily: "var(--font-typewriter), monospace", fontSize: 14, letterSpacing: 3, color: ink, marginBottom: 2, position: "relative" }}>
        EL ONE PIECE ES REAL
      </p>
      <h3 className="gold-shine" style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: 44, lineHeight: 1.25, padding: "4px 20px 6px", position: "relative" }}>
        Mi Tesoro
      </h3>

      <button type="button" onClick={() => setAbierto((o) => !o)} aria-expanded={abierto} aria-label="Cofre del tesoro — toca para abrir"
        style={{ position: "relative", display: "block", margin: "26px auto 0", width: 190, height: 150, border: "none", background: "none", padding: 0, cursor: "pointer", WebkitTapHighlightColor: "transparent" }}>
        {/* Resplandor */}
        <div style={{
          position: "absolute", left: "50%", top: 40, width: 220, height: 120, marginLeft: -110, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(247,231,206,.95), rgba(192,192,192,.35) 45%, transparent 70%)",
          opacity: abierto ? 1 : 0, transform: `scale(${abierto ? 1 : 0.4})`, transition: "all .6s ease", pointerEvents: "none",
        }} />
        {/* Monedas */}
        {MONEDAS.map((m, i) => (
          <svg key={i} viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" style={{
            position: "absolute", left: 82, top: 62, zIndex: 1,
            transform: abierto ? `translate(${m.x}px, ${m.y * 0.62}px) rotate(${m.r}deg)` : "translate(0,0) scale(.3)",
            opacity: abierto ? 1 : 0, transition: `transform .7s cubic-bezier(.2,1.4,.4,1) ${m.d}s, opacity .3s ${m.d}s`,
          }}>
            <circle cx="12" cy="12" r="10.5" fill="#E4E6EA" stroke="#6E7581" strokeWidth="1.3" />
            <text x="12" y="16.5" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="13" fill={ink}>฿</text>
          </svg>
        ))}
        {/* Cofre */}
        <svg viewBox="0 0 190 150" width="190" height="150" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "visible", animation: abierto ? "none" : "lsRespira 3.2s ease-in-out infinite" }}>
          <defs>
            <linearGradient id="ct-madera" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2c4ea3" /><stop offset="100%" stopColor="#14286b" /></linearGradient>
            <linearGradient id="ct-plata" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6E7581" /><stop offset="45%" stopColor="#F4F5F7" /><stop offset="100%" stopColor="#8a919c" /></linearGradient>
          </defs>
          {/* Cuerpo */}
          <rect x="25" y="70" width="140" height="70" rx="6" fill="url(#ct-madera)" stroke="#0d1a4a" strokeWidth="2" />
          <path d="M25 92 H165 M25 118 H165" stroke="#0d1a4a" strokeWidth="1.2" opacity=".5" />
          <rect x="45" y="70" width="12" height="70" fill="url(#ct-plata)" />
          <rect x="133" y="70" width="12" height="70" fill="url(#ct-plata)" />
          <rect x="83" y="78" width="24" height="28" rx="3" fill="url(#ct-plata)" stroke="#4a505b" />
          <circle cx="95" cy="89" r="3.5" fill="#14286b" /><rect x="93.5" y="90" width="3" height="9" fill="#14286b" />
          {/* Tapa */}
          <g style={{ transformOrigin: "95px 70px", transform: abierto ? "rotate(-28deg) translate(-10px,-22px)" : "none", transition: "transform .55s cubic-bezier(.3,1.5,.5,1)" }}>
            <path d="M25 70 V52 Q25 22 95 22 Q165 22 165 52 V70 Z" fill="url(#ct-madera)" stroke="#0d1a4a" strokeWidth="2" />
            <path d="M45 70 V40 Q45 28 57 26 V70 Z" fill="url(#ct-plata)" />
            <path d="M133 26 Q145 28 145 40 V70 H133 Z" fill="url(#ct-plata)" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <image href="/imagenes/op-jolly.png" x="78" y="30" width="34" height="34" style={{ filter: "brightness(0) invert(1)" }} opacity=".9" />
          </g>
        </svg>
      </button>

      <p style={{
        fontFamily: "var(--font-typewriter), monospace", fontSize: 14, letterSpacing: 3, color: ink, marginTop: 14, position: "relative",
        opacity: abierto ? 0 : 1, transition: "opacity .4s",
      }}>
        TOCA EL COFRE
      </p>
      <div style={{
        overflow: "hidden", maxHeight: abierto ? 220 : 0, opacity: abierto ? 1 : 0, position: "relative",
        transition: "max-height .6s .2s ease, opacity .5s .3s ease",
      }}>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 19, color: "#131f4d", lineHeight: 1.6, maxWidth: 300, margin: "4px auto 0" }}>
          Si deseas obsequiarme algo, mi mayor tesoro son los libros y todo lo de One Piece.
        </p>
      </div>
    </div>
  );
}
