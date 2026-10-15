"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

/* Galería vintage:
   1) Rueda 3D de polaroids que se arrastra con el dedo (gira sola hasta que la tocan).
   2) Al tocar una foto se abre en grande (lightbox) con desliza / flechas.
   3) En el lightbox la foto aparece en sepia y se "revela" a color al rasparla. */
const FOTOS = [
  { src: "/imagenes/foto2.jpg", pos: "50% 30%", pie: "Mis XV" },
  { src: "/imagenes/foto4.jpg", pos: "50% 25%", pie: "Azul rey" },
  { src: "/imagenes/foto1.jpg", pos: "50% 40%", pie: "Un sueño" },
  { src: "/imagenes/foto3.jpg", pos: "50% 30%", pie: "Londres en casa" },
  { src: "/imagenes/foto5.jpg", pos: "50% 35%", pie: "Mi vestido" },
  { src: "/imagenes/foto6.jpg", pos: "50% 30%", pie: "Donde todo empezó" },
];
const TILT = [-3, 2.5, -1.5, 3, -2.5, 1.5];

function Rueda({ onOpen }: { onOpen: (i: number) => void }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const n = FOTOS.length;
    let rot = 0, vel = 0, drag = false, startX = 0, startRot = 0, lastX = 0, moved = 0, auto = true;
    let raf = 0;
    const set = () => { ring.style.transform = `translateZ(-200px) rotateY(${rot}deg)`; };
    set();
    const tick = () => {
      if (!drag) {
        if (auto) rot += 0.12;
        else { rot += vel; vel *= 0.94; }
        set();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const down = (x: number) => { drag = true; auto = false; startX = x; lastX = x; startRot = rot; vel = 0; moved = 0; setHint(false); };
    const move = (x: number) => { if (!drag) return; rot = startRot + (x - startX) * 0.45; vel = (x - lastX) * 0.5; moved = Math.max(moved, Math.abs(x - startX)); lastX = x; set(); };
    const up = (target: EventTarget | null) => {
      if (!drag) return;
      drag = false;
      if (moved < 6) {
        const card = (target as HTMLElement | null)?.closest?.("[data-i]") as HTMLElement | null;
        if (card) onOpen(Number(card.dataset.i));
      }
    };
    const md = (e: MouseEvent) => { e.preventDefault(); down(e.clientX); };
    const mm = (e: MouseEvent) => move(e.clientX);
    const mu = (e: MouseEvent) => up(e.target);
    const ts = (e: TouchEvent) => down(e.touches[0].clientX);
    const tm = (e: TouchEvent) => move(e.touches[0].clientX);
    const te = (e: TouchEvent) => up(document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
    ring.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    ring.addEventListener("touchstart", ts, { passive: true });
    ring.addEventListener("touchmove", tm, { passive: true });
    ring.addEventListener("touchend", te);
    void n;
    return () => {
      cancelAnimationFrame(raf);
      ring.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      ring.removeEventListener("touchstart", ts);
      ring.removeEventListener("touchmove", tm);
      ring.removeEventListener("touchend", te);
    };
  }, [onOpen]);

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: 400, perspective: 1100, overflow: "visible" }}>
        <div ref={ringRef} style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", cursor: "grab", touchAction: "pan-y" }}>
          {FOTOS.map((f, i) => (
            <div key={i} data-i={i} style={{
              position: "absolute", left: "50%", top: "50%", width: 178, height: 236,
              marginLeft: -89, marginTop: -118,
              transform: `rotateY(${(360 / FOTOS.length) * i}deg) translateZ(200px)`,
              backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", userSelect: "none",
            }}>
              <div style={{
                width: "100%", height: "100%", background: "#FFFDF6", padding: "9px 9px 34px",
                boxShadow: "0 14px 32px rgba(20,40,107,0.28), 0 0 0 1px rgba(110,117,129,0.35)",
                transform: `rotate(${TILT[i]}deg)`, position: "relative",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={`Carely — foto ${i + 1}`} draggable={false} style={{
                  width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos, display: "block",
                  pointerEvents: "none", filter: "sepia(.55) saturate(.75) contrast(1.05)",
                }} />
                <span style={{
                  position: "absolute", left: 0, right: 0, bottom: 6, textAlign: "center",
                  fontFamily: "var(--font-great-vibes), cursive", fontSize: 21, color: "#1E3A8A",
                }}>{f.pie}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{
        textAlign: "center", marginTop: 6, fontFamily: "var(--font-cormorant), serif", fontStyle: "italic",
        fontWeight: 600, fontSize: 17, color: "#131f4d", transition: "opacity .5s", opacity: hint ? 1 : 0.75,
      }}>
        Gira la rueda con el dedo y toca una foto para verla
      </p>
    </>
  );
}

/* Foto en sepia que se revela a color al rasparla */
function Raspa({ src }: { src: string }) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      // object-fit: cover
      const s = Math.max(cv.width / img.width, cv.height / img.height);
      const w = img.width * s, h = img.height * s;
      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "sepia(1) saturate(.7) brightness(.92) contrast(1.05)";
      ctx.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
      ctx.filter = "none";
      ctx.globalCompositeOperation = "destination-out";
    };
    let down = false, strokes = 0;
    const pt = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      return [(e.clientX - r.left) * (cv.width / r.width), (e.clientY - r.top) * (cv.height / r.height)];
    };
    const scratch = (e: PointerEvent) => {
      if (!down) return;
      const [x, y] = pt(e);
      const rad = cv.width * 0.09;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      if (++strokes > 70) setDone(true);
    };
    const pd = (e: PointerEvent) => { down = true; cv.setPointerCapture(e.pointerId); scratch(e); };
    const pu = () => { down = false; };
    cv.addEventListener("pointerdown", pd);
    cv.addEventListener("pointermove", scratch);
    cv.addEventListener("pointerup", pu);
    cv.addEventListener("pointercancel", pu);
    return () => {
      cv.removeEventListener("pointerdown", pd);
      cv.removeEventListener("pointermove", scratch);
      cv.removeEventListener("pointerup", pu);
      cv.removeEventListener("pointercancel", pu);
    };
  }, [src]);

  return (
    <canvas ref={cvRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: "none", cursor: "crosshair",
      opacity: done ? 0 : 1, transition: "opacity 1.2s ease", pointerEvents: done ? "none" : "auto",
    }} />
  );
}

function Lightbox({ i, onClose, onGo }: { i: number; onClose: () => void; onGo: (d: number) => void }) {
  const sx = useRef<number | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") onGo(1); if (e.key === "ArrowLeft") onGo(-1); };
    window.addEventListener("keydown", k);
    const ov = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ov; };
  }, [onClose, onGo]);
  const f = FOTOS[i];
  return (
    <div role="dialog" aria-modal="true" aria-label="Foto en grande" onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9000, background: "rgba(10,18,48,0.88)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 18,
      animation: "lbIn .35s ease",
    }}>
      <div onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { sx.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (sx.current === null) return;
          const dx = e.changedTouches[0].clientX - sx.current; sx.current = null;
          if (Math.abs(dx) > 70) onGo(dx < 0 ? 1 : -1);
        }}
        style={{
          background: "#FFFDF6", padding: "12px 12px 52px", maxWidth: 400, width: "100%",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)", position: "relative", transform: `rotate(${TILT[i] / 2}deg)`,
        }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={f.src} src={f.src} alt={`Carely — foto ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos, display: "block" }} />
          <Raspa key={`r${i}`} src={f.src} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, textAlign: "center", fontFamily: "var(--font-great-vibes), cursive", fontSize: 30, color: "#1E3A8A" }}>
          {f.pie}
        </div>
      </div>
      <p style={{ marginTop: 18, color: "#F7E7CE", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 18, textAlign: "center" }}>
        Raspa la foto para revelar su color · desliza para cambiar
      </p>
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: 22, marginTop: 14 }}>
        <button onClick={() => onGo(-1)} aria-label="Foto anterior" style={lbBtn}>‹</button>
        <button onClick={onClose} aria-label="Cerrar" style={{ ...lbBtn, fontSize: 22 }}>✕</button>
        <button onClick={() => onGo(1)} aria-label="Foto siguiente" style={lbBtn}>›</button>
      </div>
    </div>
  );
}

const lbBtn: React.CSSProperties = {
  width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(247,231,206,0.6)",
  background: "rgba(255,255,255,0.08)", color: "#F7E7CE", fontSize: 30, lineHeight: "44px", cursor: "pointer",
};

export default function Galeria() {
  const [open, setOpen] = useState<number | null>(null);
  const onOpen = useCallback((i: number) => setOpen(i), []);
  const onClose = useCallback(() => setOpen(null), []);
  const onGo = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + FOTOS.length) % FOTOS.length)), []);

  return (
    <section style={{ padding: "64px 0", position: "relative", overflow: "hidden" }}>
      {/* Zoro en delineado, sutil, detrás del título */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/imagenes/op-zoro.png" alt="" aria-hidden="true" style={{
        position: "absolute", top: 10, right: -24, width: 150, opacity: 0.3, pointerEvents: "none", transform: "rotate(6deg)",
      }} />
      <p style={{
        fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 600, fontSize: 14,
        letterSpacing: 5, textTransform: "uppercase", color: "#14286b", textAlign: "center", marginBottom: 8, position: "relative",
      }}>
        Momentos
      </p>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive", fontSize: 50, textAlign: "center", lineHeight: 1.1, marginBottom: 10, position: "relative",
      }}>
        Mi Galería
      </h2>

      <Rueda onOpen={onOpen} />

      {/* Portal: el ScrollReveal aplica transform y rompería el position:fixed */}
      {open !== null && createPortal(<Lightbox i={open} onClose={onClose} onGo={onGo} />, document.body)}
    </section>
  );
}
