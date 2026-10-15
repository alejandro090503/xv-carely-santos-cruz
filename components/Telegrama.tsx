"use client";
import { useEffect, useRef, useState } from "react";

const TEXTO =
  "Hoy comienza una nueva etapa llena de sueños, ilusiones y momentos que guardaré por siempre en mi corazón. Quiero compartir contigo la emoción, la magia y la alegría de este día tan especial.";

/* Mensaje inicial como telegrama antiguo: se escribe letra por letra al aparecer. */
export default function Telegrama() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => setN((v) => { if (v >= TEXTO.length) { clearInterval(timer); return v; } return v + 1; }), 28);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { start(); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); if (timer) clearInterval(timer); };
  }, []);

  const ink = "#14286b";
  return (
    <section style={{ padding: "40px 22px 8px" }}>
      <div ref={ref} style={{
        position: "relative", maxWidth: 380, margin: "0 auto", padding: "22px 20px 20px",
        background: "linear-gradient(rgba(255,252,245,.74),rgba(255,252,245,.74)), #fbf6ea url('/imagenes/pergamino.jpg') center / cover",
        boxShadow: "0 12px 30px rgba(20,40,107,0.18), inset 0 0 40px rgba(120,80,30,0.08)",
        border: "1px solid rgba(110,117,129,0.45)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2px solid ${ink}`, paddingBottom: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-typewriter), monospace", fontWeight: 700, fontSize: 20, letterSpacing: 3, color: ink }}>TELEGRAMA</span>
          <span style={{ fontFamily: "var(--font-typewriter), monospace", fontSize: 14, color: ink }}>N.º 15</span>
        </div>
        <div style={{ fontFamily: "var(--font-typewriter), monospace", fontSize: 14, color: ink, lineHeight: 1.6, marginBottom: 10 }}>
          DE: CARELY SANTOS CRUZ<br />PARA: TI · CUERNAVACA, MOR.
        </div>
        <p aria-label={TEXTO} style={{
          fontFamily: "var(--font-typewriter), monospace", fontSize: 16.5, lineHeight: 1.65, color: "#131f4d",
          minHeight: "11em", margin: 0,
        }}>
          <span aria-hidden="true">{TEXTO.slice(0, n)}</span>
          <span aria-hidden="true" style={{ display: n >= TEXTO.length ? "none" : "inline-block", width: 9, height: 17, background: ink, verticalAlign: "-3px", animation: "tgBlink .9s steps(1) infinite" }} />
          <span aria-hidden="true" style={{ visibility: "hidden" }}>{TEXTO.slice(n)}</span>
        </p>
        <div style={{ textAlign: "right", fontFamily: "var(--font-typewriter), monospace", fontSize: 14, color: ink, marginTop: 8 }}>STOP.</div>
        {/* Matasellos */}
        <div style={{
          position: "absolute", right: 14, bottom: 30, width: 74, height: 74, borderRadius: "50%",
          border: "2px solid rgba(20,40,107,.55)", display: "flex", alignItems: "center", justifyContent: "center",
          transform: "rotate(-14deg)", fontFamily: "var(--font-typewriter), monospace", fontSize: 10, lineHeight: 1.3,
          color: "rgba(20,40,107,.7)", textAlign: "center", boxShadow: "inset 0 0 0 4px transparent, inset 0 0 0 5px rgba(20,40,107,.35)",
        }}>
          CORREOS<br />07·XI·26<br />CVA.
        </div>
      </div>
    </section>
  );
}
