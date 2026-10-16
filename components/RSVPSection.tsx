"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const PANEL_API = "https://panel-invitados.vercel.app/api/confirmar";
const RSVP_URL  = "https://xv-carely-santos-cruz.vercel.app";
/* Deadline: 31 oct 2026 23:59:59 — desde 1 nov 00:00 se congela */
const RSVP_DEADLINE = new Date(2026, 9, 31, 23, 59, 59, 999);
const ROJO = "#b91c1c";

type Choice = "yes" | "no";

/* WhatsApp y Messenger cortan la URL en el primer espacio o "&". El panel
   manda un token base64url en ?i= ("nombre|pases|menores") que llega intacto.
   Se conserva ?para= por si se envió algún link así. */
function decodeInvite(tok: string): string {
  try {
    let b64 = tok.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return (new TextDecoder().decode(bytes).split("|")[0] || "").trim();
  } catch {
    return "";
  }
}

/* Sin acentos ni mayúsculas para emparejar respuestas guardadas */
const clave = (x: string) =>
  String(x || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

export default function RSVPSection() {
  const searchParams = useSearchParams();
  const [para, setPara]           = useState("");
  /* Nombres que la familia asignó en el panel: una tarjeta por cada uno */
  const [asignados, setAsignados] = useState<string[]>([]);
  const [choices, setChoices]     = useState<Record<number, Choice>>({});
  const [loading, setLoading]     = useState(false);
  const [feedback, setFeedback]   = useState<{ msg: string; color: string } | null>(null);
  const [frozen, setFrozen]       = useState(false);
  const [listo, setListo]         = useState(false);   // el panel ya respondió y la invitación existe
  const [bloqueado, setBloqueado] = useState(false);
  const [resumen, setResumen]     = useState<{ estado: "confirmado" | "declino"; nombres: string[] } | null>(null);
  const [btnText, setBtnText]     = useState("Confirmar");

  useEffect(() => {
    let p = "";
    const tok = searchParams.get("i");
    if (tok) p = decodeInvite(tok);
    if (!p) p = (searchParams.get("para") || "").trim();
    setPara(p);
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
        const lista: string[] = (Array.isArray(inv.nombres_asignados) ? inv.nombres_asignados : [])
          .map((n: unknown) => String(n ?? "").trim()).filter(Boolean);
        if (!lista.length) {
          setFeedback({ msg: "Tu invitación aún no tiene lugares asignados. Contacta a la familia.", color: ROJO });
          return;
        }
        setAsignados(lista);
        if (inv.estado === "confirmado" || inv.estado === "declino") {
          const conf = (Array.isArray(inv.nombres_confirmados) ? inv.nombres_confirmados : []).map((n: string) => clave(n));
          const previas: Record<number, Choice> = {};
          lista.forEach((nm, i) => { previas[i] = inv.estado === "declino" ? "no" : (conf.includes(clave(nm)) ? "yes" : "no"); });
          setChoices(previas);
          setBtnText("Actualizar respuesta");
          setResumen({ estado: inv.estado, nombres: lista.filter((_, i) => previas[i] === "yes") });
        }
        if (inv.bloqueado) {
          setBloqueado(true);
          setFeedback({ msg: "Las confirmaciones de esta invitación ya están cerradas. Si necesitas un cambio, contacta a la familia.", color: ROJO });
        }
        setListo(true);
      })
      .catch(() => setFeedback({ msg: "No pudimos cargar tu invitación. Recarga la página.", color: ROJO }));
  }, [searchParams]);

  const cerrado = frozen || bloqueado || !listo;

  function elegir(i: number, v: Choice) {
    if (cerrado) return;
    setChoices((prev) => ({ ...prev, [i]: v }));
    setFeedback(null);
  }

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
          pases_confirmados:   nombresArr.length,
          nombres_confirmados: nombresArr,
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
    if (cerrado || loading || !asignados.length) return;
    const faltan = asignados.filter((_, i) => !choices[i]).length;
    if (faltan) {
      setFeedback({ msg: `Por favor responde por cada invitado (${faltan} pendiente${faltan === 1 ? "" : "s"}).`, color: ROJO });
      return;
    }
    const si = asignados.filter((_, i) => choices[i] === "yes");
    postConfirm(si.length ? "confirmado" : "declino", si);
  };

  /* === Estilos compartidos === */
  const toggleBtnStyle = (active: boolean, v: Choice): React.CSSProperties => ({
    flex: 1,
    padding: "11px 6px",
    minHeight: 44,
    borderRadius: 12,
    border: active ? (v === "yes" ? "1.5px solid #1E3A8A" : "1.5px solid #6E7581") : "1.5px solid rgba(30,58,138,0.20)",
    background: active
      ? (v === "yes" ? "linear-gradient(135deg,#1E3A8A,#14286b)" : "linear-gradient(135deg,rgba(110,117,129,0.22),rgba(169,192,217,0.22))")
      : "rgba(251,244,230,0.60)",
    fontFamily: "var(--font-cormorant), serif",
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 1,
    color: active ? (v === "yes" ? "#fff" : "#14286b") : "#5a6878",
    cursor: cerrado ? "not-allowed" : "pointer",
    transition: "all .2s",
    opacity: cerrado ? 0.55 : 1,
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

        {/* A quién va dirigida: nombre grande con brillo */}
        {para && listo && (
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <p style={{
              fontFamily: "var(--font-cormorant), serif", fontSize: 13, fontWeight: 700,
              letterSpacing: 4, textTransform: "uppercase", color: "#1E3A8A", marginBottom: 4,
            }}>
              Esta invitación es para
            </p>
            <p className="gold-shine" style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "clamp(42px, 11.5vw, 56px)", lineHeight: 1.2, padding: "0 .2em",
            }}>
              {para}
            </p>
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
            {asignados.length === 1 ? "1 pase reservado" : `${asignados.length} pases reservados`}
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
                : "Lamentamos que no puedan acompañarnos. Los vamos a extrañar."}
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
            {asignados.length > 0 && (
              <>
                <p style={{
                  textAlign: "center", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic",
                  fontWeight: 600, fontSize: 17, color: "#131f4d", lineHeight: 1.5, marginBottom: 12,
                }}>
                  Marca si asistirá cada persona de tu invitación.
                </p>
                {/* Una tarjeta por persona asignada */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 8 }}>
                  {asignados.map((nm, i) => {
                    const sel = choices[i];
                    return (
                      <div key={i} style={{
                        padding: "14px 12px 12px", borderRadius: 16, textAlign: "center",
                        border: sel === "yes" ? "1.5px solid #1E3A8A" : sel === "no" ? "1.5px solid rgba(110,117,129,0.55)" : "1.5px solid rgba(30,58,138,0.16)",
                        background: sel === "yes" ? "rgba(30,58,138,0.07)" : sel === "no" ? "rgba(110,117,129,0.08)" : "rgba(251,244,230,0.70)",
                        transition: "all .2s",
                      }}>
                        <p style={{
                          fontFamily: "var(--font-great-vibes), cursive", fontSize: 30, color: "#14286b",
                          lineHeight: 1.2, marginBottom: 10,
                        }}>
                          {nm}
                        </p>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button type="button" disabled={cerrado} aria-pressed={sel === "yes"} onClick={() => elegir(i, "yes")} style={toggleBtnStyle(sel === "yes", "yes")}>
                            Asistirá
                          </button>
                          <button type="button" disabled={cerrado} aria-pressed={sel === "no"} onClick={() => elegir(i, "no")} style={toggleBtnStyle(sel === "no", "no")}>
                            No asistirá
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
