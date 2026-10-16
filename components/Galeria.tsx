"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

/* Galería vintage:
   1) Carrusel horizontal de polaroids (desliza con el dedo, avanza solo hasta que lo tocan).
   2) Al tocar una foto se abre en grande (lightbox) con desliza / flechas.
   3) En el lightbox la foto aparece en sepia y se "revela" a color al rasparla. */
const FOTOS = [
  { src: "/imagenes/foto1.jpg", pos: "50% 40%", pie: "" },
  { src: "/imagenes/gal/g01.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g02.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g03.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g04.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g05.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g06.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g07.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g08.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g10.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g11.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g12.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g13.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g14.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g15.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/gal/g16.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/foto2.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/foto4.jpg", pos: "50% 25%", pie: "" },
  { src: "/imagenes/foto3.jpg", pos: "50% 30%", pie: "" },
  { src: "/imagenes/foto5.jpg", pos: "50% 35%", pie: "" },
];
const TILT = FOTOS.map((_, i) => [-3, 2.5, -1.5, 3, -2.5, 1.5][i % 6]);

/* Carrusel horizontal de polaroids: se desliza con el dedo (scroll con imán),
   avanza solo cada pocos segundos hasta que lo tocan, y al tocar una foto se abre. */
function Carrusel({ onOpen }: { onOpen: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState(0);
  const tocado = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      setAct(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
    };
    const stop = () => { tocado.current = true; };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", stop);
    el.addEventListener("touchstart", stop, { passive: true });
    const id = setInterval(() => {
      if (tocado.current) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const paso = card.offsetWidth + 16;
      const fin = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: fin ? 0 : el.scrollLeft + paso, behavior: "smooth" });
    }, 3200);
    return () => { clearInterval(id); el.removeEventListener("scroll", onScroll); el.removeEventListener("pointerdown", stop); el.removeEventListener("touchstart", stop); };
  }, []);

  const ir = (d: number) => {
    const el = ref.current; const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    tocado.current = true;
    el.scrollBy({ left: d * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <>
      <div ref={ref} className="carrusel-h" style={{
        display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch",
        padding: "18px calc(50% - 115px) 26px", scrollbarWidth: "none",
      }}>
        {FOTOS.map((f, i) => (
          <button key={f.src} type="button" onClick={() => onOpen(i)} aria-label={`Ver foto ${i + 1}`} style={{
            flex: "0 0 230px", scrollSnapAlign: "center", border: "none", padding: 0, background: "none", cursor: "pointer",
            transform: `rotate(${TILT[i]}deg) scale(${i === act ? 1 : 0.9})`, transition: "transform .45s ease, opacity .45s ease",
            opacity: i === act ? 1 : 0.7,
          }}>
            <div style={{
              background: "#FFFDF6", padding: "10px 10px 28px",
              boxShadow: "0 14px 30px rgba(20,40,107,0.25), 0 0 0 1px rgba(110,117,129,0.3)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={`Carely — foto ${i + 1}`} draggable={false} loading={i < 4 ? "eager" : "lazy"} style={{
                width: "100%", aspectRatio: "3 / 4", objectFit: "cover", objectPosition: f.pos, display: "block",
                filter: "sepia(.22) saturate(.92) contrast(1.03)",
              }} />
            </div>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 4 }}>
        <button onClick={() => ir(-1)} aria-label="Foto anterior" style={btnNav}>‹</button>
        <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 17, letterSpacing: 2, color: "#14286b", minWidth: 64, textAlign: "center" }}>
          {Math.min(act + 1, FOTOS.length)} / {FOTOS.length}
        </span>
        <button onClick={() => ir(1)} aria-label="Foto siguiente" style={btnNav}>›</button>
      </div>
      <p style={{
        textAlign: "center", marginTop: 10, fontFamily: "var(--font-cormorant), serif", fontStyle: "italic",
        fontWeight: 600, fontSize: 17, color: "#131f4d",
      }}>
        Desliza para ver más y toca una foto para verla
      </p>
    </>
  );
}

const btnNav: React.CSSProperties = {
  width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(110,117,129,0.55)",
  background: "rgba(255,255,255,0.75)", color: "#1E3A8A", fontSize: 28, lineHeight: "36px", cursor: "pointer",
};

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
      ctx.filter = "sepia(.6) saturate(.85) brightness(.97)";
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
          background: "#FFFDF6", padding: "12px 12px 34px", maxWidth: 400, width: "100%",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)", position: "relative", transform: `rotate(${TILT[i] / 2}deg)`,
        }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={f.src} src={f.src} alt={`Carely — foto ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos, display: "block" }} />
          <Raspa key={`r${i}`} src={f.src} />
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

      <Carrusel onOpen={onOpen} />

      {/* Portal: el ScrollReveal aplica transform y rompería el position:fixed */}
      {open !== null && createPortal(<Lightbox i={open} onClose={onClose} onGo={onGo} />, document.body)}
    </section>
  );
}
