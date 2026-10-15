"use client";
import { useState, useRef } from "react";
import SplashScreen from "./SplashScreen";
import Hero from "./Hero";
import Ornament from "./Ornament";
import CountdownTimer from "./CountdownTimer";
import Ubicacion from "./Ubicacion";
import CalendarioBtn from "./CalendarioBtn";
import Itinerario from "./Itinerario";
import DressCode from "./DressCode";
import Galeria from "./Galeria";
import Telegrama from "./Telegrama";
import SeBusca from "./SeBusca";
import Familia from "./Familia";
import MesaRegalos from "./MesaRegalos";
import InstagramSection from "./InstagramSection";
import RSVPWrapper from "./RSVPWrapper";
import Footer from "./Footer";
import MusicFab, { type MusicFabHandle } from "./MusicFab";
import ScrollReveal from "./ScrollReveal";

export default function InvitacionClient() {
  const [contentVisible, setContentVisible] = useState(false);
  const [splashMounted, setSplashMounted] = useState(true);
  const musicRef = useRef<MusicFabHandle>(null);

  const handleOpen = () => {
    // Iniciar música AQUÍ — mismo call stack que el gesto del usuario → autoplay permitido
    musicRef.current?.play();
    // Fade-in del contenido en paralelo con el fade-out del splash
    setContentVisible(true);
    // Desmontar el splash tras completarse su fade (0.75s + margen)
    setTimeout(() => {
      setSplashMounted(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 820);
  };

  return (
    <>
      {/* SPLASH */}
      {splashMounted && <SplashScreen onOpen={handleOpen} />}

      {/* CONTENIDO PRINCIPAL */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.85s ease",
          maxWidth: 430,
          margin: "0 auto",
          position: "relative",
          overflowX: "clip",
          zIndex: 1,
          backgroundColor: "transparent",
        }}
      >
        {/* HERO */}
        <Hero />

        {/* MENSAJE — telegrama vintage */}
        <ScrollReveal>
          <Telegrama />
        </ScrollReveal>

        {/* CARTEL SE BUSCA (One Piece) */}
        <ScrollReveal>
          <SeBusca />
        </ScrollReveal>

        {/* FAMILIA — justo después del header */}
        <ScrollReveal>
          <Familia />
        </ScrollReveal>

        {/* ORNAMENTO */}
        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* FECHA */}
        <ScrollReveal>
          <div style={{ padding: "32px 26px 10px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
              <div style={{ flex: 1, maxWidth: 60, height: 1, background: "linear-gradient(to right,transparent,#1E3A8A)", opacity: 0.5 }} />
              <div style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#14286b",
                textIndent: 8,
              }}>
                7 · Noviembre · 2026
              </div>
              <div style={{ flex: 1, maxWidth: 60, height: 1, background: "linear-gradient(to left,transparent,#1E3A8A)", opacity: 0.5 }} />
            </div>
          </div>
        </ScrollReveal>

        {/* COUNTDOWN */}
        <ScrollReveal>
          <CountdownTimer />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* UBICACIÓN */}
        <ScrollReveal>
          <Ubicacion />
        </ScrollReveal>

        {/* CALENDARIO */}
        <ScrollReveal>
          <CalendarioBtn />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* ITINERARIO */}
        <ScrollReveal>
          <Itinerario />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* DRESS CODE */}
        <ScrollReveal>
          <DressCode />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* GALERÍA */}
        <ScrollReveal>
          <Galeria />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* MESA DE REGALOS */}
        <ScrollReveal>
          <MesaRegalos />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* INSTAGRAM / ÁLBUM */}
        <ScrollReveal>
          <InstagramSection />
        </ScrollReveal>

        <ScrollReveal>
          <Ornament />
        </ScrollReveal>

        {/* RSVP */}
        <RSVPWrapper />

        {/* FOOTER */}
        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </div>

      {/* FAB MÚSICA */}
      <MusicFab ref={musicRef} />
    </>
  );
}
