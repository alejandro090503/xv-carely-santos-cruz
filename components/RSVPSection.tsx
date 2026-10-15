"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const PANEL_API = "https://panel-invitados.vercel.app/api/confirmar";
const RSVP_URL  = "https://xv-carely-santos-cruz.vercel.app";
/* Deadline: 31 oct 2026 23:59:59 — desde 1 nov 00:00 se congela */
const RSVP_DEADLINE = new Date(2026, 9, 31, 23, 59, 59, 999);
const ROJO = "#b91c1c";

type Choice = "yes" | "no" | "";

/* WhatsApp y Messenger cortan la URL en el primer espacio o "&". El panel
   manda un token base64url en ?i= ("nombre|pases|menores") que llega intacto.
   Se conserva ?para=&pases= por si se envió algún link así. */
function decodeInvite(tok: string): { para: string; pases: number } | null {
  try {
    let b64 = tok.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const pr = new TextDecoder().decode(bytes).split("|");
    return { para: (pr[0] || "").trim(), pases: parseInt(pr[1], 10) || 1 };
  } catch {
    return null;
  }
}

export default function RSVPSection() {
  const searchParams = useSearchParams();
  /* Tope: lo que la familia asignó en el panel. Lo que se ocupa arranca en 1. */
  const [pases, setPases]       = useState(1);
  const [aUsar, setAUsar]       = useState(1);
  const [para, setPara]         = useState("");
  const [names, setNames]       = useState<string[]>([""]);
  const [faltan, setFaltan]     = useState<boolean[]>([]);
  const [choice, setChoice]     = useState<Choice>("");
  const [loading, setLoading]   = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; color: string } | null>(null);
  const [frozen, setFrozen]     = useState(false);
  const [listo, setListo]       = useState(false);   // el panel ya respondió y la invitación existe
  const [bloqueado, setBloqueado] = useState(false);
  const [resumen, setResumen]   = useState<{ estado: "confirmado" | "declino"; nombres: string[] } | null>(null);
  const [btnText, setBtnText]   = useState("Confirmar");

  useEffect(() => {
    let p = "", raw = NaN;
    const tok = searchParams.get("i");
    if (tok) { const d = decodeInvite(tok); if (d && d.para) { p = d.para; raw = d.pases; } }
    if (!p) { p = (searchParams.get("para") || "").trim(); raw = parseInt(searchParams.get("pases") || "1", 10); }
    setPara(p);
    setPases(isNaN(raw) || raw < 1 || raw > 20 ? 1 : raw);
    setFrozen(Date.now() > RSVP_DEADLINE.getTime());
    if (!p) {
      setFeedback({ msg: "Abre el enlace personalizado que te enviaron para confirmar tu asistencia.", color: ROJO });
      return;
    }
    fetch(`${PANEL_API}?nombre=${encodeURIComponent(p)}&url_boda=${encodeURIComponent(RSVP_URL)}`)
      .then((r) => r.json())
      .then((d) => {
        const inv = d?.invitado;
        /* Si el panel no la tiene no se deja confirmar: el envío crearía una
           invitación nueva y los contadores dejarían de cuadrar. */
        if (!inv) {
          setFeedback({ msg: "No encontramos tu invitación. Pide a la familia que te envíe tu enlace de nuevo.", color: ROJO });
          return;
        }
        const asig = typeof inv.pases === "number" && inv.pases > 0 && inv.pases <= 20 ? inv.pases : 1;
        setPases(asig);
        if (inv.estado === "confirmado" || inv.estado === "declino") {
          const nm: string[] = Array.isArray(inv.nombres_confirmados) ? inv.nombres_confirmados : [];
          const n = Math.min(asig, Math.max(1, nm.length));
          setAUsar(n);
          setNames(Array.from({ length: n }, (_, i) => nm[i] ?? ""));
          setChoice(inv.estado === "confirmado" ? "yes" : "no");
          setBtnText("Actualizar respuesta");
          setResumen({ estado: inv.estado, nombres: nm });
        }
        if (inv.bloqueado) {
          setBloqueado(true);
          setFeedback({ msg: "Las confirmaciones de esta invitación ya están cerradas. Si necesitas un cambio, contacta a la familia.", color: ROJO });
        }
        setListo(true);
      })
      .catch(() => setListo(true));
  }, [searchParams]);

  const cerrado = frozen || bloqueado || !listo;

  function cambiarPases(n: number) {
    n = Math.max(1, Math.min(pases, n));
    if (n === aUsar) return;
    setAUsar(n);
    setNames((prev) => Array.from({ length: n }, (_, i) => prev[i] ?? ""));
    setFaltan([]);
    setFeedback(null);
  }

  const handleName = (i: number, val: string) => {
    setNames((prev) => { const next = [...prev]; next[i] = val; return next; });
    setFaltan((prev) => { const next = [...prev]; next[i] = false; return next; });
  };

  async function postConfirm(estado: "confirmado" | "declino", nombresArr: string[]) {
    setLoading(true);
    setBtnText("Enviando…");
    setFeedback(null);
    try {
      const r = await fetch(PANEL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:              para,
          estado,
          pases_confirmados:   estado === "confirmado" ? nombresArr.length : 0,
          nombres_confirmados: estado === "confirmado" ? nombresArr : [],
          url_boda:            RSVP_URL,
        }),
      });
      const d = await r.json().catch(() => null);
      /* Solo se da por registrada si el panel la guardó de verdad */
      if (r.ok && d?.ok) {
        setBtnText("Actualizar respuesta");
        setResumen({ estado, nombres: nombresArr });
        return;
      }
      setBtnText("Confirmar");
      const err = d?.error;
      if (err === "respuestas_cerradas") {
        setBloqueado(true);
        setFeedback({ msg: "Las confirmaciones de esta invitación ya están cerradas. Si necesitas un cambio, contacta a la familia.", color: ROJO });
        return;
      }
      setFeedback({
        msg: err === "no_match"
          ? "No pudimos identificar tu invitación. Abre el enlace personalizado que te enviaron; ese es el único que registra tu confirmación."
          : err === "invitacion_borrada"
            ? "Esta invitación ya no está activa. Contacta a la familia para que te envíen un enlace nuevo."
            : "Hubo un problema al enviar. Intenta de nuevo.",
        color: ROJO,
      });
    } catch {
      setBtnText("Confirmar");
      setFeedback({ msg: "Sin conexión. Verifica tu internet e intenta de nuevo.", color: ROJO });
    } finally {
      setLoading(false);
    }
  }

  const handleConfirm = () => {
    if (cerrado || loading) return;
    if (!choice) { setFeedback({ msg: "Selecciona si asistirás o no.", color: ROJO }); return; }
    if (choice === "no") { postConfirm("declino", []); return; }
    const filled = names.map((n) => n.trim()).filter((n) => n);
    if (filled.length === 0) { setFeedback({ msg: "Por favor escribe al menos un nombre.", color: ROJO }); return; }
    /* Dos personas en un solo campo ("Ana & Luis") se guardaban como UNA */
    const doble = names.findIndex((n) => /[&/+,]|\sand\s/i.test(n.trim()));
    if (doble >= 0) {
      setFaltan(names.map((_, i) => i === doble));
      setFeedback({ msg: "Escribe un solo nombre por campo. Si asisten más personas, sube el contador y escribe cada nombre en su campo.", color: ROJO });
      return;
    }
    if (filled.length < aUsar) {
      const f = aUsar - filled.length;
      setFaltan(names.map((n) => !n.trim()));
      setFeedback({
        msg: `Elegiste ${aUsar} pases pero escribiste ${filled.length} nombre${filled.length === 1 ? "" : "s"}. Escribe ${f === 1 ? "el nombre que falta" : `los ${f} nombres que faltan`} o baja el contador a los pases que vas a utilizar.`,
        color: ROJO,
      });
      return;
    }
    postConfirm("confirmado", filled);
  };

  /* === Estilos compartidos === */
  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "12px 8px",
    minHeight: 44,
    borderRadius: 12,
    border: active ? "1.5px solid #1E3A8A" : "1.5px solid rgba(30,58,138,0.20)",
    background: active ? "linear-gradient(135deg,rgba(30,58,138,0.14),rgba(169,192,217,0.18))" : "rgba(251,244,230,0.60)",
    fontFamily: "var(--font-cormorant), serif",
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 1.5,
    color: active ? "#14286b" : "#5a6878",
    cursor: cerrado ? "not-allowed" : "pointer",
    transition: "all .2s",
    opacity: cerrado ? 0.55 : 1,
  });
  const contBtn = (dis: boolean): React.CSSProperties => ({
    width: 44, height: 44, borderRadius: "50%",
    border: "1.5px solid #1E3A8A", background: "#fff", color: "#14286b",
    fontSize: 24, fontWeight: 700, lineHeight: 1,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: dis ? "default" : "pointer", opacity: dis ? 0.35 : 1,
  });

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(145deg,rgba(255,255,255,0.88),rgba(251,244,230,0.97))",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(30,58,138,0.18)",
    borderRadius: 24,
    padding: "28px 22px",
    boxShadow: "0 4px 20px rgba(20,40,107,0.08)",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <section style={{ padding: "64px 26px" }}>
      {/* Den Den Mushi (caracol-teléfono de One Piece) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/imagenes/op-denden.png" alt="" aria-hidden="true" style={{ display: "block", width: 120, margin: "0 auto -6px", opacity: 0.9 }} />
      <p style={{
        textAlign: "center", fontFamily: "var(--font-typewriter), monospace", fontSize: 14, letterSpacing: 2,
        color: "#14286b", marginBottom: 4,
      }}>
        PURU PURU PURU… ¡GACHA!
      </p>
      <h2 className="gold-shine" style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.1,
        marginBottom: 30,
      }}>
        Confirmación
      </h2>

      <div style={cardStyle}>
        {/* Barra superior */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%",
          height: 1.5,
          background: "linear-gradient(90deg,transparent,#1E3A8A 25%,#A8ADB6 50%,#a9c0d9 75%,transparent)",
        }} />

        {/* Banner deadline si está congelado */}
        {frozen && (
          <div style={{
            marginBottom: 18,
            padding: "14px 16px",
            borderRadius: 12,
            background: "rgba(110,117,129,0.10)",
            border: "1px solid rgba(110,117,129,0.30)",
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 14,
            lineHeight: 1.5,
            color: "#14286b",
            textAlign: "center",
          }}>
            ✦ El plazo para confirmar cerró el <strong style={{ fontStyle: "normal" }}>31 de octubre de 2026</strong>.<br />
            Si necesitas ajustar tu respuesta, por favor contacta directamente.
          </div>
        )}

        {/* Badge de pases */}
        {para && listo && (
          <div style={{
            display: "block", width: "fit-content",
            margin: "0 auto 18px",
            background: "linear-gradient(135deg,#1E3A8A,#14286b)",
            color: "#fff", borderRadius: 30,
            padding: "5px 20px",
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic", fontSize: 15, letterSpacing: 2,
            textAlign: "center",
          }}>
            {pases === 1 ? "1 pase reservado" : `${pases} pases reservados`}
          </div>
        )}

        {/* Fecha límite */}
        <p style={{
          textAlign: "center",
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic", fontWeight: 500, fontSize: 15,
          color: "#1E3A8A", letterSpacing: 2, marginBottom: 18,
        }}>
          Confirma antes del 31 de octubre de 2026
        </p>

        {resumen ? (
          /* Agradecimiento: la bandeja se cierra al confirmar */
          <div style={{ textAlign: "center", padding: "6px 4px 2px" }}>
            <p style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: 36, color: "#14286b", lineHeight: 1.2, marginBottom: 10 }}>
              {resumen.estado === "confirmado" ? "¡Gracias por confirmar!" : "Gracias por avisarnos"}
            </p>
            <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 18, color: "#131f4d", lineHeight: 1.6, marginBottom: 18 }}>
              {resumen.estado === "confirmado"
                ? (resumen.nombres.length === 1
                    ? `Te esperamos, ${resumen.nombres[0]}.`
                    : `Confirmamos ${resumen.nombres.length} lugares: ${resumen.nombres.join(", ")}.`)
                : "Lamentamos que no puedas acompañarnos. Te vamos a extrañar."}
            </p>
            {!bloqueado && (
              <button
                type="button"
                disabled={frozen}
                onClick={() => { setResumen(null); setFeedback(null); }}
                style={{
                  padding: "12px 24px", borderRadius: 30, border: "1.5px solid #1E3A8A",
                  background: "transparent", color: "#14286b", cursor: frozen ? "default" : "pointer",
                  fontFamily: "var(--font-cormorant), serif", fontSize: 13, fontWeight: 700,
                  letterSpacing: 2, textTransform: "uppercase", opacity: frozen ? 0.5 : 1,
                }}
              >
                Modificar mi respuesta
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Toggle Sí/No asistiré */}
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              <button type="button" disabled={cerrado} onClick={() => { setChoice("yes"); setFeedback(null); }} style={toggleBtnStyle(choice === "yes")}>
                Sí asistiré
              </button>
              <button type="button" disabled={cerrado} onClick={() => { setChoice("no"); setFeedback(null); }} style={toggleBtnStyle(choice === "no")}>
                No asistiré
              </button>
            </div>

            {choice === "yes" && (
              <>
                {/* Contador: cuántos de sus pases va a ocupar realmente */}
                <p style={{
                  textAlign: "center", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic",
                  fontWeight: 600, fontSize: 17, color: "#131f4d", lineHeight: 1.5, marginBottom: 10,
                }}>
                  {pases === 1
                    ? "Tienes 1 pase reservado para ti."
                    : `Tienes ${pases} pases reservados. Aumenta el número de pases que vayas a ocupar.`}
                </p>
                {pases > 1 && (
                  <>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 18,
                      padding: "10px 16px", marginBottom: 6,
                      background: "rgba(251,244,230,0.80)", border: "1.5px solid rgba(30,58,138,0.20)", borderRadius: 14,
                    }}>
                      <button type="button" aria-label="Quitar un pase" disabled={cerrado || aUsar <= 1} onClick={() => cambiarPases(aUsar - 1)} style={contBtn(cerrado || aUsar <= 1)}>−</button>
                      <span aria-live="polite" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 38, fontWeight: 600, color: "#14286b", minWidth: 54, textAlign: "center", lineHeight: 1 }}>{aUsar}</span>
                      <button type="button" aria-label="Agregar un pase" disabled={cerrado || aUsar >= pases} onClick={() => cambiarPases(aUsar + 1)} style={contBtn(cerrado || aUsar >= pases)}>+</button>
                    </div>
                    <p style={{
                      textAlign: "center", fontFamily: "var(--font-cormorant), serif", fontSize: 12, fontWeight: 700,
                      letterSpacing: 2, textTransform: "uppercase", color: "#1E3A8A", marginBottom: 16,
                    }}>
                      {aUsar >= pases ? "Estás usando todos tus pases" : `${aUsar} de ${pases} pases`}
                    </p>
                  </>
                )}

                {/* Un campo por pase que se va a usar */}
                <div style={{ marginBottom: 8 }}>
                  {Array.from({ length: aUsar }).map((_, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{
                        flexShrink: 0, width: 30, height: 30, borderRadius: "50%",
                        background: "linear-gradient(135deg,#1E3A8A,#a9c0d9)",
                        color: "#fff", fontSize: 13,
                        fontFamily: "var(--font-cormorant), serif",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700,
                        opacity: cerrado ? 0.55 : 1,
                      }}>
                        {i + 1}
                      </div>
                      <input
                        type="text"
                        disabled={cerrado}
                        maxLength={60}
                        placeholder={aUsar === 1 ? "Tu nombre completo" : `Nombre completo del invitado ${i + 1}`}
                        aria-label={aUsar === 1 ? "Tu nombre completo" : `Nombre completo del invitado ${i + 1}`}
                        value={names[i] ?? ""}
                        onChange={(e) => handleName(i, e.target.value)}
                        style={{
                          flex: 1, padding: "14px 16px", minHeight: 50,
                          border: faltan[i] ? `1.5px solid ${ROJO}` : "1.5px solid rgba(30,58,138,0.25)",
                          boxShadow: faltan[i] ? "0 0 0 3px rgba(185,28,28,0.15)" : "none",
                          borderRadius: 12,
                          background: cerrado ? "rgba(241,237,231,0.7)" : "rgba(251,244,230,0.80)",
                          fontFamily: "var(--font-cormorant), serif",
                          fontWeight: 500, fontSize: 16, color: "#131f4d",
                          outline: "none", transition: "border-color 0.3s",
                          WebkitAppearance: "none",
                          cursor: cerrado ? "not-allowed" : "text",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Botón confirmar */}
            <button
              onClick={handleConfirm}
              disabled={loading || cerrado}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%", marginTop: 12, padding: "16px", minHeight: 52,
                background: frozen ? "linear-gradient(135deg,#bba,#998)" : "linear-gradient(135deg,#1E3A8A,#14286b)",
                color: "#fff", borderRadius: 30, border: "none",
                cursor: (loading || cerrado) ? "not-allowed" : "pointer",
                fontFamily: "var(--font-cormorant), serif",
                fontSize: 15, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: 3,
                boxShadow: "0 4px 22px rgba(20,40,107,0.28)",
                opacity: (loading || cerrado) ? 0.55 : 1,
              }}
            >
              {frozen ? "Plazo cerrado" : bloqueado ? "Confirmaciones cerradas" : btnText}
            </button>
          </>
        )}

        {/* Avisos: fuera de la bandeja para que se vean aunque esté cerrada */}
        {feedback && (
          <p style={{
            textAlign: "center", marginTop: 12, marginBottom: 4,
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic", fontSize: 15, fontWeight: 600, lineHeight: 1.5,
            color: feedback.color,
          }}>
            {feedback.msg}
          </p>
        )}
      </div>
    </section>
  );
}
