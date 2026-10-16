"use client";
import { useEffect, useState } from "react";

/* Portada con foto (inspirada en xv-giselle-cervantes-castillo): fotos de Carely a
   pantalla completa que se funden entre sí con un zoom lento, velo nocturno azul rey,
   chispas plateadas y el nombre abajo. El borde inferior se disuelve en el pergamino
   con una máscara de curva suave (sin corte recto). */
const FOTOS = [
  { src: "/imagenes/foto1.jpg", pos: "50% 30%" },
  { src: "/imagenes/foto4.jpg", pos: "50% 20%" },
  { src: "/imagenes/foto2.jpg", pos: "50% 22%" },
  { src: "/imagenes/foto5.jpg", pos: "50% 22%" },
];

const CHISPAS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100, top: (i * 53) % 70, size: 1.5 + ((i * 7) % 3), dur: 2.6 + ((i * 11) % 30) / 10, del: ((i * 13) % 40) / 10,
}));

/* Máscara "ease-out" de muchos pasos: el desvanecido no deja una línea visible. */
const FUNDIDO = "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,.94) 76%, rgba(0,0,0,.82) 80%, rgba(0,0,0,.64) 84%, rgba(0,0,0,.44) 88%, rgba(0,0,0,.26) 92%, rgba(0,0,0,.12) 95.5%, rgba(0,0,0,.04) 98%, transparent 100%)";

export default function Hero() {
  const [persona, setPersona] = useState<{ para: string; pases: number } | null>(null);
  const [actual, setActual] = useState(0);
  const [listo, setListo] = useState(false);

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
    const t = setTimeout(() => setListo(true), 350);
    const id = setInterval(() => setActual((a) => (a + 1) % FOTOS.length), 5200);
    return () => { clearTimeout(t); clearInterval(id); };
  }, []);

  const entra = (d: number): React.CSSProperties => ({
    opacity: listo ? 1 : 0, transform: listo ? "none" : "translateY(18px)",
    transition: `opacity 1s ease ${d}s, transform 1s ease ${d}s`,
  });

  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      {/* Capa visual (fotos + velo + chispas) con fundido inferior */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", WebkitMaskImage: FUNDIDO, maskImage: FUNDIDO }}>
        {FOTOS.map((f, i) => (
          <div key={f.src} style={{
            position: "absolute", inset: 0, backgroundImage: `url('${f.src}')`, backgroundSize: "cover", backgroundPosition: f.pos,
            opacity: i === actual ? 1 : 0, transform: i === actual ? "scale(1.08)" : "scale(1)",
            transition: "opacity 1.8s ease, transform 7s ease-out",
          }} />
        ))}
        {/* Velo nocturno: deja ver el rostro arriba y oscurece donde va el texto */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,20,60,.42) 0%, rgba(10,20,60,.08) 22%, rgba(10,20,60,.06) 40%, rgba(12,26,78,.55) 55%, rgba(14,30,90,.86) 78%, rgba(20,40,107,.9) 100%)",
        }} />
        {/* Viñeta vintage */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 85% 70% at 50% 35%, transparent 55%, rgba(8,16,48,.45) 100%)" }} />
        {/* Marco plateado fino: sin borde inferior, sus lados se desvanecen con el fundido */}
        <div style={{ position: "absolute", top: 14, left: 14, right: 14, bottom: 14, border: "1px solid rgba(220,228,242,.38)", borderBottom: "none", opacity: listo ? 1 : 0, transition: "opacity 1s ease .2s" }} />
        {CHISPAS.map((c, i) => (
          <i key={i} style={{
            position: "absolute", left: `${c.left}%`, top: `${c.top}%`, width: c.size, height: c.size, borderRadius: "50%",
            background: "#fff", boxShadow: "0 0 6px 1px rgba(220,228,242,.85)", animation: `heroChispa ${c.dur}s ease-in-out ${c.del}s infinite`,
          }} />
        ))}
      </div>


      {/* Texto */}
      <div style={{ position: "relative", marginTop: "max(54vh, 380px)", padding: "0 26px 20vh", textAlign: "center", color: "#fff" }}>
        <div style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "clamp(34px, 9.5vw, 44px)", color: "#E4E6EA", lineHeight: 1, textShadow: "0 2px 14px rgba(5,12,40,.6)", ...entra(0.5) }}>
          Mis
        </div>
        <div style={{
          fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: "clamp(70px, 21vw, 96px)", letterSpacing: 18, textIndent: 18, lineHeight: 1,
          background: "linear-gradient(100deg, #9aa1ad 0%, #F4F5F7 30%, #C0C0C0 50%, #ffffff 62%, #A8ADB6 80%, #E4E6EA 100%)",
          backgroundSize: "250% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent",
          animation: "goldSweep 6s linear infinite", filter: "drop-shadow(0 3px 14px rgba(5,12,40,.55))", ...entra(0.75),
        }}>
          XV
        </div>
        <h1 style={{
          fontFamily: "var(--font-great-vibes), cursive", fontWeight: 400, fontSize: "clamp(64px, 19vw, 96px)", lineHeight: 1.15, margin: "2px 0 0",
          color: "#fff", textShadow: "0 2px 18px rgba(5,12,40,.65), 0 0 30px rgba(74,123,183,.35)", ...entra(1),
        }}>
          Carely
        </h1>
        <div style={{ width: 70, height: 1, margin: "14px auto 12px", background: "linear-gradient(to right, transparent, rgba(220,228,242,.9), transparent)", ...entra(1.2) }} />
        <div style={{
          fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 18, letterSpacing: 5, textTransform: "uppercase",
          color: "#F4F5F7", textShadow: "0 1px 10px rgba(5,12,40,.7)", ...entra(1.35),
        }}>
          7 · Noviembre · 2026
        </div>
        <div style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 17, color: "#DCE3F0", marginTop: 4, textShadow: "0 1px 10px rgba(5,12,40,.7)", ...entra(1.45) }}>
          Cuernavaca, Morelos
        </div>

        {/* Puntos del carrusel de portada */}
        <div style={{ display: "flex", gap: 7, justifyContent: "center", marginTop: 16, ...entra(1.6) }}>
          {FOTOS.map((_, i) => (
            <span key={i} style={{ width: i === actual ? 18 : 6, height: 6, borderRadius: 3, background: i === actual ? "#E4E6EA" : "rgba(228,230,234,.45)", transition: "width .4s ease" }} />
          ))}
        </div>

        {persona && (
          /* A quién va dirigida: tarjeta de vidrio sobre la foto */
          <div style={{
            marginTop: 22, padding: "16px 14px 18px", borderRadius: 18,
            background: "rgba(255,255,255,0.14)", border: "1px solid rgba(228,230,234,0.45)",
            boxShadow: "0 8px 28px rgba(5,12,40,0.35)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            maxWidth: 330, marginLeft: "auto", marginRight: "auto", ...entra(1.7),
          }}>
            <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 14, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase", color: "#F4F5F7", margin: 0 }}>
              Esta invitación es para
            </p>
            <p style={{
              fontFamily: "var(--font-great-vibes), cursive", fontSize: persona.para.length > 22 ? 34 : 42, lineHeight: 1.2, margin: "6px 0 8px",
              color: "#fff", textShadow: "0 0 14px rgba(220,228,242,.7)", padding: "0 4px",
            }}>
              {persona.para}
            </p>
            <span style={{
              display: "inline-block", padding: "6px 20px", borderRadius: 30, background: "linear-gradient(135deg,#F4F5F7,#A8ADB6)",
              color: "#14286b", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 700, fontSize: 18, letterSpacing: 1,
            }}>
              {persona.pases === 1 ? "1 pase reservado" : `${persona.pases} pases reservados`}
            </span>
          </div>
        )}
      </div>

      {/* Indicador de scroll */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: "9vh", left: "50%", transform: "translateX(-50%)", animation: "hintFloat 3s ease-in-out infinite" }}>
        <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, transparent, rgba(20,40,107,0.6))" }} />
      </div>
    </section>
  );
}
