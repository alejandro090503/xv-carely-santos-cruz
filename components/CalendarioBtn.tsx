"use client";

const GCAL_URL = (() => {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent("XV Años de Carely");
  const details = encodeURIComponent(
    "Misa 1:00 PM · Parroquia María Auxiliadora (Chipitlán) · Recepción 3:00 PM · Villa Trisara, Cuernavaca."
  );
  const location = encodeURIComponent("Parroquia María Auxiliadora, José María Morelos 50, Chipitlan, 62070 Cuernavaca, Mor.");
  // 2026-11-07 13:00 CDMX (UTC-6) → UTC = 2026-11-07T19:00:00Z
  const dates = "20261107T190000Z/20261108T070000Z";
  return `${base}&text=${title}&dates=${dates}&details=${details}&location=${location}`;
})();

export default function CalendarioBtn() {
  return (
    <section style={{ padding: "40px 26px 64px", textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontSize: 13,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#1E3A8A",
        marginBottom: 8,
        opacity: 0.85,
      }}>
        No lo olvides
      </p>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 48,
        lineHeight: 1.25,
        marginBottom: 16,
        padding: "4px 20px 8px",
        overflow: "visible",
        display: "inline-block",
      }}>
        Guárdalo
      </h2>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 17,
        color: "#131f4d",
        opacity: 0.70,
        marginBottom: 20,
      }}>
        Agrega el evento a tu calendario
      </p>
      <a
        href={GCAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: "linear-gradient(135deg,#1E3A8A,#14286b)",
          color: "#FFFFFF",
          borderRadius: 30,
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 14,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 3,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(20,40,107,0.30)",
          transition: "opacity .3s,transform .3s",
        }}
      >
        Añadir a Google Calendar
      </a>
    </section>
  );
}
