"use client";
import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

/* Galería interactiva: mazo de fotos estilo vintage. Se avanza deslizando
   la foto de arriba (o con los botones / tocando los puntos). */
const FOTOS = [
  { src: "/imagenes/foto2.jpg", pos: "50% 30%" },
  { src: "/imagenes/foto4.jpg", pos: "50% 25%" },
  { src: "/imagenes/foto1.jpg", pos: "50% 40%" },
  { src: "/imagenes/foto3.jpg", pos: "50% 30%" },
  { src: "/imagenes/foto5.jpg", pos: "50% 35%" },
  { src: "/imagenes/foto6.jpg", pos: "50% 30%" },
];

const TILT = [-3, 2.5, -1.5, 3, -2.5, 1.5];

export default function Galeria() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const n = FOTOS.length;

  const go = (d: number) => {
    setDir(d);
    setIdx((i) => (i + d + n) % n);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  return (
    <section style={{ padding: "64px 22px", position: "relative" }}>
      {/* Zoro en delineado, muy sutil, detrás del título */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/imagenes/op-zoro.png" alt="" aria-hidden="true" style={{
        position: "absolute", top: 18, right: -30, width: 170, opacity: 0.22, pointerEvents: "none", transform: "rotate(6deg)",
      }} />

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
        position: "relative",
      }}>
        Momentos
      </p>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.1,
        marginBottom: 30,
        position: "relative",
      }}>
        Mi Galería
      </h2>

      {/* Mazo */}
      <div style={{ position: "relative", height: 440, maxWidth: 330, margin: "0 auto", touchAction: "pan-y" }}>
        {/* Fotos de abajo (decorativas) */}
        {[2, 1].map((k) => {
          const f = FOTOS[(idx + k) % n];
          return (
            <div key={`b${k}`} style={{
              position: "absolute", inset: 0,
              transform: `rotate(${TILT[(idx + k) % n]}deg) translateY(${k * 6}px) scale(${1 - k * 0.04})`,
              background: "#FBF4E6",
              padding: "12px 12px 46px",
              boxShadow: "0 10px 30px rgba(20,40,107,0.16)",
              border: "1px solid rgba(110,117,129,0.35)",
              transition: "transform .5s ease",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos, filter: "sepia(.35) saturate(.8) brightness(.95)" }} />
            </div>
          );
        })}

        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={onDragEnd}
            initial={{ x: dir * 260, opacity: 0, rotate: dir * 10 }}
            animate={{ x: 0, opacity: 1, rotate: TILT[idx] }}
            exit={{ x: -dir * 320, opacity: 0, rotate: -dir * 16, transition: { duration: 0.35 } }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            whileTap={{ scale: 1.02, cursor: "grabbing" }}
            style={{
              position: "absolute", inset: 0,
              background: "#FFFDF8",
              padding: "12px 12px 46px",
              boxShadow: "0 18px 44px rgba(20,40,107,0.28)",
              border: "1px solid rgba(110,117,129,0.45)",
              cursor: "grab",
              zIndex: 3,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOTOS[idx].src} alt={`Carely — foto ${idx + 1}`} draggable={false} style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: FOTOS[idx].pos,
              display: "block", pointerEvents: "none",
              filter: "contrast(1.04) saturate(1.05)",
              boxShadow: "inset 0 0 40px rgba(20,40,107,.25)",
            }} />
            {/* Viñeta vintage */}
            <div style={{ position: "absolute", inset: "12px 12px 46px", pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 60%, rgba(20,40,107,0.28) 100%)" }} />
            <div style={{
              position: "absolute", left: 0, right: 0, bottom: 10, textAlign: "center",
              fontFamily: "var(--font-great-vibes), cursive", fontSize: 26, color: "#1E3A8A",
            }}>
              Carely · {String(idx + 1).padStart(2, "0")}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 30, position: "relative" }}>
        <button onClick={() => go(-1)} aria-label="Foto anterior" style={btn}>‹</button>
        <div style={{ display: "flex", gap: 8 }}>
          {FOTOS.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }} aria-label={`Ver foto ${i + 1}`} style={{
              width: i === idx ? 22 : 8, height: 8, borderRadius: 4, border: "none", padding: 0, cursor: "pointer",
              background: i === idx ? "linear-gradient(90deg,#1E3A8A,#4A7BB7)" : "rgba(110,117,129,0.45)",
              transition: "width .3s ease",
            }} />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Foto siguiente" style={btn}>›</button>
      </div>
      <p style={{
        textAlign: "center", marginTop: 14, fontFamily: "var(--font-cormorant), serif", fontStyle: "italic",
        fontWeight: 500, fontSize: 16, color: "#131f4d", position: "relative",
      }}>
        Desliza la foto para avanzar
      </p>
    </section>
  );
}

const btn: React.CSSProperties = {
  width: 42, height: 42, borderRadius: "50%",
  border: "1px solid rgba(110,117,129,0.55)",
  background: "rgba(255,255,255,0.7)",
  color: "#1E3A8A",
  fontFamily: "var(--font-cormorant), serif",
  fontSize: 28, lineHeight: "36px", cursor: "pointer",
  boxShadow: "0 4px 12px rgba(20,40,107,0.12)",
};
