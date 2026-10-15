"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("2026-11-07T13:00:00-06:00");

function getRemainingTime() {
  const now = new Date();
  const diff = TARGET.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

const TOTAL_DAYS = Math.ceil(
  (TARGET.getTime() - new Date("2026-01-01").getTime()) / (1000 * 60 * 60 * 24)
);

interface RingProps {
  value: number;
  label: string;
  max: number;
  color: string;
  glowColor: string;
}

function Ring({ value, label, max, color, glowColor }: RingProps) {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circ * (1 - pct);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", width: 70, height: 70 }}>
        <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%", overflow: "visible", filter: "drop-shadow(0 2px 8px rgba(139,26,82,0.08))" }}>
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(30,58,138,0.07)" strokeWidth="3" />
          <circle cx="60" cy="60" r={r} fill="none" stroke={glowColor} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
            style={{ filter: "blur(7px)", opacity: 0.3 }}
          />
          <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 26,
            fontWeight: 600,
            color: "#131f4d",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: 0.6,
          }}>
            {String(value).padStart(2, "0")}
          </span>
          <span style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#1E3A8A",
            marginTop: 2,
            opacity: 0.78,
          }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Reloj de arena vintage: la arena baja durante cada minuto y el reloj
   se voltea al empezar el siguiente (remonta por key = minutos). */
function Hourglass({ seconds, minuteKey }: { seconds: number; minuteKey: number }) {
  const p = 1 - seconds / 60; // 0 = arriba lleno, 1 = abajo lleno
  const topH = 44 * (1 - p);
  const botH = 44 * p;
  return (
    <div key={minuteKey} style={{ width: 92, margin: "0 auto 26px", animation: "hgFlip .9s cubic-bezier(.5,0,.3,1.3)" }}>
      <svg viewBox="0 0 100 160" width="92" height="147" aria-hidden="true" style={{ overflow: "visible", filter: "drop-shadow(0 6px 14px rgba(20,40,107,0.25))" }}>
        <defs>
          <linearGradient id="hg-silver" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6E7581" />
            <stop offset="35%" stopColor="#E4E6EA" />
            <stop offset="60%" stopColor="#A8ADB6" />
            <stop offset="100%" stopColor="#5f6672" />
          </linearGradient>
          <linearGradient id="hg-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7E7CE" />
            <stop offset="100%" stopColor="#d9c09a" />
          </linearGradient>
          <clipPath id="hg-top"><path d="M24 22 Q24 58 50 78 Q76 58 76 22 Z" /></clipPath>
          <clipPath id="hg-bot"><path d="M50 82 Q24 102 24 138 L76 138 Q76 102 50 82 Z" /></clipPath>
        </defs>
        {/* Vidrio */}
        <path d="M24 22 Q24 58 50 80 Q24 102 24 138 L76 138 Q76 102 50 80 Q76 58 76 22 Z" fill="rgba(74,123,183,0.10)" stroke="#1E3A8A" strokeWidth="1.6" />
        {/* Arena arriba */}
        <rect x="20" y={78 - topH} width="60" height={topH} fill="url(#hg-sand)" clipPath="url(#hg-top)" style={{ transition: "all 1s linear" }} />
        {/* Hilo de arena */}
        {seconds > 0 && <line x1="50" y1="78" x2="50" y2={138 - botH} stroke="#d9c09a" strokeWidth="1.4" strokeDasharray="2 3" style={{ animation: "hgStream .4s linear infinite" }} />}
        {/* Arena abajo */}
        <rect x="20" y={138 - botH} width="60" height={botH} fill="url(#hg-sand)" clipPath="url(#hg-bot)" style={{ transition: "all 1s linear" }} />
        {/* Brillo del vidrio */}
        <path d="M31 30 Q32 52 44 68" stroke="#fff" strokeWidth="2" fill="none" opacity=".6" strokeLinecap="round" />
        {/* Marco plateado */}
        <rect x="12" y="10" width="76" height="12" rx="3" fill="url(#hg-silver)" stroke="#1E3A8A" strokeWidth="1" />
        <rect x="12" y="138" width="76" height="12" rx="3" fill="url(#hg-silver)" stroke="#1E3A8A" strokeWidth="1" />
        <rect x="15" y="22" width="4" height="116" fill="url(#hg-silver)" />
        <rect x="81" y="22" width="4" height="116" fill="url(#hg-silver)" />
        <circle cx="17" cy="16" r="2" fill="#1E3A8A" /><circle cx="83" cy="16" r="2" fill="#1E3A8A" />
        <circle cx="17" cy="144" r="2" fill="#1E3A8A" /><circle cx="83" cy="144" r="2" fill="#1E3A8A" />
      </svg>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getRemainingTime());

  useEffect(() => {
    const id = setInterval(() => setTime(getRemainingTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ padding: "64px 26px" }}>
      <h2 className="sec-title gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.1,
        marginBottom: 30,
      }}>
        Cuenta Regresiva
      </h2>

      <div style={{
        background: "linear-gradient(145deg,rgba(255,255,255,0.78),rgba(251,244,230,0.92))",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(30,58,138,0.13)",
        borderRadius: 28,
        padding: "40px 20px 36px",
        boxShadow: "0 12px 48px rgba(20,40,107,0.07),inset 0 1px 0 rgba(255,255,255,0.85)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Barra superior */}
        <div style={{ position: "absolute", top: -1, left: "15%", right: "15%", height: 1.5,
          background: "linear-gradient(90deg,transparent,#1E3A8A 25%,#A8ADB6 50%,#a9c0d9 75%,transparent)",
        }} />

        <Hourglass seconds={time.seconds} minuteKey={time.minutes} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px", maxWidth: 380, margin: "0 auto", justifyItems: "center" }}>
          <Ring value={time.days} label="Días" max={TOTAL_DAYS} color="#1E3A8A" glowColor="#1E3A8A" />
          <Ring value={time.hours} label="Horas" max={24} color="#4A7BB7" glowColor="#4A7BB7" />
          <Ring value={time.minutes} label="Minutos" max={60} color="#A8ADB6" glowColor="#A8ADB6" />
          <Ring value={time.seconds} label="Segundos" max={60} color="#a9c0d9" glowColor="#a9c0d9" />
        </div>

        <div style={{ textAlign: "center", marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(30,58,138,0.10)" }}>
          <p style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 16,
            color: "#131f4d",
            opacity: 1,
            letterSpacing: 1,
            lineHeight: 1.6,
          }}>
            Cada segundo más cerca de este día especial
          </p>
        </div>
      </div>
    </section>
  );
}
