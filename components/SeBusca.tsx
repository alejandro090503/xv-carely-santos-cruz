"use client";

/* Cartel de "Se Busca" estilo One Piece, en pergamino y tinta azul rey. */
export default function SeBusca() {
  const ink = "#14286b";
  return (
    <section style={{ padding: "40px 26px 24px", display: "flex", justifyContent: "center" }}>
      <div style={{
        position: "relative", width: "100%", maxWidth: 320, padding: "22px 22px 20px",
        background: "#efe1c4 url('/imagenes/pergamino.jpg') center / cover",
        boxShadow: "0 18px 40px rgba(20,40,107,0.28), inset 0 0 60px rgba(120,80,30,0.35)",
        transform: "rotate(-1.5deg)", textAlign: "center",
      }}>
        {/* Clavo */}
        <div style={{ position: "absolute", top: 8, left: "50%", width: 12, height: 12, marginLeft: -6, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #E4E6EA, #6E7581 70%)", boxShadow: "0 2px 3px rgba(0,0,0,.4)" }} />
        <div style={{
          fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 54, lineHeight: 1,
          letterSpacing: 4, color: ink, marginTop: 8, textShadow: "0 1px 0 rgba(255,255,255,.35)",
        }}>
          SE BUSCA
        </div>
        <div style={{
          margin: "14px auto 10px", border: `3px solid ${ink}`, padding: 4, background: "rgba(255,255,255,.15)",
          boxShadow: "inset 0 0 0 1px rgba(20,40,107,.35)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imagenes/foto5.jpg" alt="Carely en su cartel de Se Busca" style={{
            width: "100%", aspectRatio: "4 / 4.4", objectFit: "cover", objectPosition: "50% 22%", display: "block",
            filter: "sepia(.75) saturate(.6) contrast(1.08) brightness(.97)",
          }} />
        </div>
        <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontStyle: "italic", fontSize: 19, letterSpacing: 6, color: ink }}>
          VIVA · PARA CELEBRAR
        </div>
        <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 40, letterSpacing: 6, color: ink, lineHeight: 1.1, marginTop: 4 }}>
          CARELY
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 2, color: ink }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 700 }}>฿</span>
          <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 30, letterSpacing: 2 }}>15 AÑOS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 8, borderTop: `1px solid rgba(20,40,107,.35)` }}>
          <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 14, letterSpacing: 3, color: ink }}>07 · XI · MMXXVI</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imagenes/op-jolly.png" alt="" aria-hidden="true" style={{ width: 38, opacity: 0.85 }} />
          <span style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: 14, letterSpacing: 3, color: ink }}>CUERNAVACA</span>
        </div>
      </div>
    </section>
  );
}
