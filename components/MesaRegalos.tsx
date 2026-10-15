"use client";

import LluviaSobres from "./LluviaSobres";
import CofreTesoro from "./CofreTesoro";

export default function MesaRegalos() {
  return (
    <section style={{ padding: "64px 26px", position: "relative" }}>
      {/* Luffy en delineado (arte oficial del manga), marca de agua sutil */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/imagenes/op-luffy.png" alt="" aria-hidden="true" style={{
        position: "absolute", bottom: 10, left: -40, width: 190, opacity: 0.2, pointerEvents: "none", transform: "rotate(-6deg)",
      }} />
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.25,
        marginBottom: 16,
        padding: "6px 24px 10px",
        overflow: "visible",
        display: "block",
      }}>
        Mesa de Regalos
      </h2>

      {/* Frase intro */}
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 19,
        color: "#14286b",
        lineHeight: 1.65,
        letterSpacing: 0.4,
        textAlign: "center",
        maxWidth: 360,
        margin: "0 auto 30px",
      }}>
        Tu cariño y presencia son el mejor regalo que puedo recibir. Si deseas obsequiarme algo, estas son mis sugerencias.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>

        <LluviaSobres />

        <CofreTesoro />

      </div>
    </section>
  );
}
