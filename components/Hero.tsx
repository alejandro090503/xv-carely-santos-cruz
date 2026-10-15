"use client";
import { useEffect, useRef, useState } from "react";

const PARTICLES = [
  { left: "7%",  size: 4, dur: 9,  del: 0,   color: "#1E3A8A" },
  { left: "21%", size: 3, dur: 12, del: 1.4, color: "#A8ADB6" },
  { left: "36%", size: 5, dur: 8,  del: 0.6, color: "#4A7BB7" },
  { left: "54%", size: 3, dur: 10, del: 2.2, color: "#1E3A8A" },
  { left: "69%", size: 5, dur: 11, del: 0.9, color: "#A8ADB6" },
  { left: "84%", size: 3, dur: 9,  del: 1.8, color: "#4A7BB7" },
  { left: "13%", size: 6, dur: 13, del: 3.1, color: "#1E3A8A" },
  { left: "47%", size: 4, dur: 10, del: 2.7, color: "#A8ADB6" },
  { left: "75%", size: 5, dur: 12, del: 0.4, color: "#4A7BB7" },
  { left: "91%", size: 3, dur: 8,  del: 1.6, color: "#1E3A8A" },
];

/** Esquina ornamental */
function CornerOrnament({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const rot = { tl: "0deg", tr: "90deg", br: "180deg", bl: "270deg" }[pos];
  const placement: React.CSSProperties =
    pos === "tl" ? { top: -1, left: -1 } :
    pos === "tr" ? { top: -1, right: -1, transform: `rotate(${rot})`, transformOrigin: "top right" } :
    pos === "br" ? { bottom: -1, right: -1, transform: `rotate(${rot})`, transformOrigin: "bottom right" } :
                   { bottom: -1, left: -1, transform: `rotate(${rot})`, transformOrigin: "bottom left" };
  const base: React.CSSProperties = pos === "tl"
    ? { position: "absolute", transform: `rotate(${rot})`, transformOrigin: "top left" }
    : { position: "absolute" };

  return (
    <div style={{ ...base, ...placement }}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M1 1 L1 17" stroke="#6E7581" strokeWidth="1"   opacity="0.85" strokeLinecap="round" />
        <path d="M1 1 L17 1" stroke="#6E7581" strokeWidth="1"   opacity="0.85" strokeLinecap="round" />
        <path d="M5 5 L5 13" stroke="#6E7581" strokeWidth="0.5" opacity="0.45" strokeLinecap="round" />
        <path d="M5 5 L13 5" stroke="#6E7581" strokeWidth="0.5" opacity="0.45" strokeLinecap="round" />
        <circle cx="1"  cy="1"  r="2"   fill="#6E7581" opacity="0.95" />
        <circle cx="1"  cy="17" r="0.9" fill="#6E7581" opacity="0.55" />
        <circle cx="17" cy="1"  r="0.9" fill="#6E7581" opacity="0.55" />
        <circle cx="5"  cy="5"  r="1.2" fill="#6E7581" opacity="0.65" />
      </svg>
    </div>
  );
}

/** Separador ornamental con diamante hueco */
function OrnamentBar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, transparent, rgba(110,117,129,0.65))" }} />
        <svg width="5" height="5" viewBox="0 0 5 5">
          <rect width="5" height="5" fill="#6E7581" transform="rotate(45 2.5 2.5)" opacity="0.70" />
        </svg>
        <svg width="11" height="11" viewBox="0 0 11 11">
          <rect x="1.5" y="1.5" width="8" height="8" fill="#6E7581" transform="rotate(45 5.5 5.5)" opacity="0.95" />
          <rect x="3.5" y="3.5" width="4" height="4" fill="#FBF4E6" transform="rotate(45 5.5 5.5)" />
          <rect x="4.5" y="4.5" width="2" height="2" fill="#6E7581" transform="rotate(45 5.5 5.5)" opacity="0.80" />
        </svg>
        <svg width="5" height="5" viewBox="0 0 5 5">
          <rect width="5" height="5" fill="#6E7581" transform="rotate(45 2.5 2.5)" opacity="0.70" />
        </svg>
        <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, rgba(110,117,129,0.65), transparent)" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <div style={{ flex: 1, height: 0.4, background: "linear-gradient(90deg, transparent, rgba(110,117,129,0.30))" }} />
        <div style={{ width: 21 }} />
        <div style={{ flex: 1, height: 0.4, background: "linear-gradient(90deg, rgba(110,117,129,0.30), transparent)" }} />
      </div>
    </div>
  );
}

function MicroBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "8px 0 10px" }}>
      <div style={{ width: 22, height: 0.5, background: "rgba(110,117,129,0.55)" }} />
      <svg width="5" height="5" viewBox="0 0 5 5">
        <rect width="5" height="5" fill="#6E7581" transform="rotate(45 2.5 2.5)" opacity="0.80" />
      </svg>
      <div style={{ width: 22, height: 0.5, background: "rgba(110,117,129,0.55)" }} />
    </div>
  );
}

function TopOrnamentLine() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 36px", marginBottom: 14 }}>
      <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, transparent, rgba(110,117,129,0.55))" }} />
      <svg width="5" height="5"  viewBox="0 0 5 5"><rect width="5" height="5" fill="#6E7581" transform="rotate(45 2.5 2.5)" opacity="0.75"/></svg>
      <div style={{ width: 14, height: 0.5, background: "rgba(110,117,129,0.55)" }} />
      <svg width="8" height="8"  viewBox="0 0 8 8"><rect x="1" y="1" width="6" height="6" fill="#6E7581" transform="rotate(45 4 4)" opacity="0.95"/></svg>
      <div style={{ width: 14, height: 0.5, background: "rgba(110,117,129,0.55)" }} />
      <svg width="5" height="5"  viewBox="0 0 5 5"><rect width="5" height="5" fill="#6E7581" transform="rotate(45 2.5 2.5)" opacity="0.75"/></svg>
      <div style={{ flex: 1, height: 0.5, background: "linear-gradient(90deg, rgba(110,117,129,0.55), transparent)" }} />
    </div>
  );
}

export default function Hero() {
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const frameRef   = useRef<HTMLDivElement>(null);
  const xvRef      = useRef<HTMLDivElement>(null);
  const dateRef    = useRef<HTMLDivElement>(null);
  const [persona, setPersona] = useState<{ para: string; pases: number } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let para = (params.get("para") || "").trim();
    let rawP = params.get("pases");
    /* Links del panel: token base64url en ?i= ("nombre|pases|menores") */
    const tok = params.get("i");
    if (tok) {
      try {
        let b64 = tok.replace(/-/g, "+").replace(/_/g, "/");
        while (b64.length % 4) b64 += "=";
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const pr = new TextDecoder().decode(bytes).split("|");
        if ((pr[0] || "").trim()) { para = pr[0].trim(); rawP = pr[1] || "1"; }
      } catch { /* token roto: se queda lo de ?para= */ }
    }
    const n = rawP ? parseInt(rawP, 10) : 1;
    const validN = isNaN(n) || n < 1 || n > 20 ? 1 : n;
    if (para) setPersona({ para, pases: validN });
  }, []);

  useEffect(() => {
    const schedule = [
      { el: nameRef,    delay: 480,  styles: { opacity: "1", transform: "translateY(0) scale(1)" } },
      { el: frameRef,   delay: 820,  styles: { opacity: "1", transform: "scaleY(1)" } },
      { el: xvRef,      delay: 1100, styles: { opacity: "1", transform: "translateY(0)" } },
      { el: dateRef,    delay: 1380, styles: { opacity: "1", transform: "translateY(0)" } },
    ];
    const timers = schedule.map(({ el, delay, styles }) =>
      setTimeout(() => { if (el.current) Object.assign(el.current.style, styles); }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(165deg, #FBF4E6 0%, #F3EADB 50%, #FBF4E6 100%)",
        overflow: "hidden",
        padding: "62px 0 48px",
      }}
    >
      {/* Textura acuarela navy/oro — exclusiva del hero-portada, más marcada
          que el fondo global y difuminada en los bordes para no cortar seco. */}
      <div style={{
        position: "absolute", inset: 0,
        background: "url('/fondo-textura.jpg') center center / cover no-repeat",
        opacity: 0.55,
        pointerEvents: "none",
        maskImage: "radial-gradient(ellipse 92% 82% at 50% 50%, #000 55%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 92% 82% at 50% 50%, #000 55%, transparent 100%)",
      }} />

      {/* Glow radial central */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 75% 50% at 50% 42%, rgba(169,192,217,0.35) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Ambient golden top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "38%",
        background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(168,173,182,0.18) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Partículas */}
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: -10, left: p.left,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: p.color,
          opacity: 0.55,
          animation: `floatUp ${p.dur}s ${p.del}s linear infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* ══════════ NOMBRE — fuera del frame ══════════ */}
      <div style={{
        width: "100%",
        textAlign: "center",
        overflow: "visible",
        padding: "0 0 4px",
      }}>
        <TopOrnamentLine />

        <h1
          ref={nameRef}
          className="gold-shine gold-shine-hero"
          style={{
            fontFamily: "var(--font-great-vibes), cursive",
            fontSize: "min(26vw, 120px)",
            lineHeight: 1.2,
            margin: 0,
            padding: "4px 28px 12px 22px",
            opacity: 0,
            transform: "translateY(22px) scale(0.97)",
            transition: "opacity 0.95s ease, transform 0.95s ease",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          Carely
        </h1>
      </div>

      {/* ══════════ MARCO ORNAMENTAL ══════════ */}
      <div style={{ width: "100%", maxWidth: 360, padding: "0 24px" }}>
        <div
          ref={frameRef}
          style={{
            position: "relative",
            border: "1px solid rgba(110,117,129,0.55)",
            borderRadius: 2,
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            opacity: 0,
            transform: "scaleY(0.94)",
            transition: "opacity 0.85s ease, transform 0.85s ease",
          }}
        >
          <div style={{
            position: "absolute", inset: 5,
            border: "0.5px solid rgba(110,117,129,0.30)",
            borderRadius: 1,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 10,
            border: "0.3px solid rgba(110,117,129,0.16)",
            borderRadius: 1,
            pointerEvents: "none",
          }} />

          <CornerOrnament pos="tl" />
          <CornerOrnament pos="tr" />
          <CornerOrnament pos="bl" />
          <CornerOrnament pos="br" />

          <div style={{ padding: "26px 26px 24px", textAlign: "center" }}>
            <div style={{ marginBottom: 18 }}>
              <OrnamentBar />
            </div>

            <div
              ref={xvRef}
              style={{
                opacity: 0,
                transform: "translateY(18px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
              }}
            >
              <div className="gold-shine gold-shine-hero" style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 700,
                fontSize: "clamp(64px, 18vw, 86px)",
                letterSpacing: 22,
                lineHeight: 1,
                textIndent: 22,
              }}>
                XV
              </div>

              <MicroBar />

              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(20px, 5.5vw, 26px)",
                letterSpacing: 11,
                textTransform: "uppercase",
                color: "#14286b",
                textIndent: 11,
              }}>
                Años
              </div>
            </div>

            <div style={{ margin: "18px 0 14px" }}>
              <OrnamentBar />
            </div>

            <div
              ref={dateRef}
              style={{
                opacity: 0,
                transform: "translateY(10px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
              }}
            >
              <span style={{
                display: "inline-block",
                padding: "5px 22px",
                border: "0.6px solid rgba(110,117,129,0.40)",
                borderRadius: 40,
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontSize: 14,
                letterSpacing: 4,
                color: "#14286b",
                background: "rgba(255,255,255,0.5)",
              }}>
                7 · Noviembre · 2026
              </span>

              {persona && (
                /* A quién va dirigida: tarjeta translúcida para que no pase desapercibida */
                <div style={{
                  marginTop: 22,
                  padding: "16px 14px 18px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.62)",
                  border: "1px solid rgba(168,173,182,0.45)",
                  boxShadow: "0 6px 22px rgba(20,40,107,0.10)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  textAlign: "center",
                  maxWidth: 340,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}>
                  <p style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: 2.2,
                    textTransform: "uppercase",
                    color: "#1E3A8A",
                    margin: 0,
                  }}>
                    Esta invitación es para
                  </p>
                  <p style={{
                    fontFamily: "var(--font-great-vibes), cursive",
                    fontSize: persona.para.length > 22 ? 32 : 40,
                    lineHeight: 1.2,
                    margin: "6px 0 4px",
                    background: "linear-gradient(135deg,#6E7581,#A8ADB6 45%,#E4E6EA 55%,#6E7581)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    padding: "0 4px",
                  }}>
                    {persona.para}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "4px 0 10px" }}>
                    <span style={{ width: 38, height: 1, background: "linear-gradient(90deg,transparent,#A8ADB6)" }} />
                    <span style={{ color: "#A8ADB6", fontSize: 11 }}>✦</span>
                    <span style={{ width: 38, height: 1, background: "linear-gradient(90deg,#A8ADB6,transparent)" }} />
                  </div>
                  <span style={{
                    display: "inline-block",
                    padding: "6px 20px",
                    borderRadius: 30,
                    background: "linear-gradient(135deg,#1E3A8A,#14286b)",
                    color: "#fff",
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: 1,
                  }}>
                    {persona.pases === 1 ? "1 pase reservado" : `${persona.pases} pases reservados`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute",
        bottom: 22,
        left: "50%",
        transform: "translateX(-50%)",
        animation: "hintFloat 3s ease-in-out infinite",
      }}>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, transparent, rgba(20,40,107,0.55))" }} />
      </div>
    </section>
  );
}
