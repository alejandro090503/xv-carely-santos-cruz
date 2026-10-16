"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  onOpen: () => void;
  /* Se llama en el mismo toque: arranca la música dentro del gesto del usuario */
  onTap?: () => void;
}

export default function SplashScreen({ onOpen, onTap }: Props) {
  const screenRef  = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);
  const [opening, setOpening] = useState(false);
  const [exiting, setExiting] = useState(false);

  /* Entrada del sobre */
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    requestAnimationFrame(() => { if (el) el.style.opacity = "1"; });
  }, []);

  const handleTap = () => {
    if (opening) return;
    setOpening(true);
    onTap?.();
    if (btnRef.current) btnRef.current.style.opacity = "0";

    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});

    const crossfade = () => {
      vid.style.opacity = "1";
      if (imgRef.current) imgRef.current.style.opacity = "0";
    };
    if (vid.readyState >= 2) crossfade();
    else vid.addEventListener("playing", crossfade, { once: true });

    /* Al terminar el video del sobre abriéndose: revelar la invitación */
    vid.addEventListener("ended", () => {
      setExiting(true);
      const screen = screenRef.current;
      if (screen) {
        screen.style.transition = "opacity 0.75s cubic-bezier(0.4,0,0.2,1)";
        screen.style.opacity = "0";
      }
      onOpen();
    }, { once: true });
  };

  return (
    <div
      ref={screenRef}
      role="button"
      aria-label="Toca para abrir el sobre"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        overflow: "hidden",
        cursor: opening ? "default" : "pointer",
        background: "#14286b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/sobre.jpg"
        alt="Sobre de invitación — Carely XV Años"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease",
        }}
      />

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <source src="/envelope.mp4" type="video/mp4" />
      </video>

      {!exiting && (
        <button
          ref={btnRef}
          onClick={handleTap}
          style={{
            position: "absolute",
            bottom: "16%",
            left: 0,
            right: 0,
            width: "fit-content",
            margin: "0 auto",
            zIndex: 3,
            padding: "16px 44px",
            borderRadius: 40,
            background: "rgba(10,20,40,0.45)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(168,173,182,0.55)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 15,
            fontWeight: 600,
            fontStyle: "italic",
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#D9DCE1",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            cursor: "pointer",
            animation: "hintFloat 3.2s ease-in-out infinite",
            transition: "opacity 0.4s ease",
          }}
        >
          Toca para abrir
        </button>
      )}
    </div>
  );
}
