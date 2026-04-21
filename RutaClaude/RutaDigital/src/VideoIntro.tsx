import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import rutaLogo from "./assets/RUTADIgitalLogo.svg";

const DARK   = "#080B12";  // Abismo — fondo principal
const VOID   = "#0E1220";  // Void — superficie cards
const LIGHT  = "#EEF2FF";  // Blanco Frío — texto / fondo claro
const CYAN   = "#00D4FF";  // Pulso Cyan — acento / highlights
const BRAND  = "#1557FF";  // Ruta Blue — color de marca

function useSp(frame: number, fps: number, delay = 0, cfg: Record<string, number> = {}) {
  return spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 100, mass: 0.9, ...cfg } });
}

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

function ltrWipe(frame: number, start: number, end: number) {
  const p = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return `inset(0 ${(1 - p) * 100}% 0 0)`;
}

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── ACT 1 ─────────────────────────────────────────────────
  const act1Op  = interpolate(frame, [68, 85], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const logoSc  = 0.45 + clamp01(useSp(frame, fps, 0, { damping: 18, stiffness: 75 })) * 0.55;
  const logoOp  = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const rutaX   = (1 - clamp01(useSp(frame, fps, 34, { damping: 24, stiffness: 80 }))) * -95;
  const digX    = (1 - clamp01(useSp(frame, fps, 50, { damping: 24, stiffness: 80 }))) * 95;
  const nameOp  = interpolate(frame, [34, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW   = interpolate(frame, [72, 105], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // ── ACT 2 ─────────────────────────────────────────────────
  const tagY   = (1 - clamp01(useSp(frame, fps, 108, { damping: 26, stiffness: 72 }))) * 32;
  const tagOp  = interpolate(frame, [108, 132], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub1Op = interpolate(frame, [134, 156], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub2Op = interpolate(frame, [158, 178], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── ACT 3 — logo brand, fade-in y hold ──────────────────
  const act4LogoOp = interpolate(frame, [210, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const finalY     = (1 - clamp01(useSp(frame, fps, 210, { damping: 28, stiffness: 72 }))) * 28;
  const act4Hide   = interpolate(frame, [258, 265], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── ACT 4 — logo sube achicándose ───────────────────────
  const collapseP = interpolate(frame, [263, 310], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const col5X     = 640;
  const col5Y     = 360 - collapseP * 560;
  const col5Scale = 1 - collapseP * 0.7;
  const col5H     = 108;

  return (
    <AbsoluteFill style={{ background: DARK, overflow: "hidden" }}>

      {/* ══ ACT 1 — logo + brand ══ */}
      <AbsoluteFill style={{ background: DARK, opacity: act1Op }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 38 }}>
          <div style={{ opacity: logoOp, transform: `scale(${logoSc})`, filter: "brightness(0) invert(1)" }}>
            <img src={rutaLogo} alt="Ruta Digital" style={{ height: 92, width: "auto", display: "block" }} />
          </div>
          <div style={{ opacity: nameOp, textAlign: "center" }}>
            <div style={{ display: "flex", gap: 18, alignItems: "baseline", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 88, color: LIGHT, letterSpacing: "-0.04em", lineHeight: 1, transform: `translateX(${rutaX}px)`, display: "inline-block" }}>Ruta</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 88, color: CYAN,  letterSpacing: "-0.04em", lineHeight: 1, transform: `translateX(${digX}px)`,  display: "inline-block" }}>Digital</span>
            </div>
            <div style={{ position: "relative", height: 3, marginTop: 18, overflow: "hidden", borderRadius: 2 }}>
              <div style={{ position: "absolute", inset: 0, width: `${lineW}%`, background: `linear-gradient(90deg, ${CYAN}, rgba(0,212,255,0.08))`, borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ══ WIPE 1 → ACT 2 light (80–108f) ══ */}
      <AbsoluteFill style={{ background: LIGHT, clipPath: ltrWipe(frame, 80, 108) }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, calc(-50% + ${tagY}px))`, textAlign: "center", width: "78%", opacity: tagOp }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 72, color: DARK, lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            Marketing que<br />
            <span style={{ color: LIGHT, background: BRAND, padding: "2px 16px", borderRadius: 8, display: "inline-block", marginTop: 8 }}>convierte.</span>
          </div>
          <div style={{ opacity: sub1Op, marginTop: 32 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 22, color: VOID }}>Para empresas que quieren crecer de verdad.</p>
          </div>
          <div style={{ opacity: sub2Op, marginTop: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", border: `1.5px solid ${DARK}`, borderRadius: 100, padding: "12px 30px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: DARK }}>
                Más ventas · Más visibilidad · Más clientes
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ══ WIPE 2 + ACT 3 + ACT 4 — sobre Ruta Blue ══ */}
      {frame >= 182 && (
        <AbsoluteFill style={{ background: BRAND, clipPath: ltrWipe(frame, 182, 212) }}>

          {/* ACT 3: logo centrado, fade-in y hold */}
          {frame < 265 && (
            <AbsoluteFill style={{ opacity: act4LogoOp * act4Hide }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, calc(-50% + ${finalY}px))`, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
                <div style={{ filter: "brightness(0) invert(1)" }}>
                  <img src={rutaLogo} alt="Ruta Digital" style={{ height: 108, width: "auto", display: "block" }} />
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(238,242,255,0.65)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  Marketing · Estrategia · Resultados
                </p>
              </div>
            </AbsoluteFill>
          )}

          {/* ACT 4: logo sube achicándose */}
          {frame >= 263 && (
            <div style={{ position: "absolute", left: col5X, top: col5Y, transform: `translate(-50%, -50%) scale(${col5Scale})`, zIndex: 10 }}>
              <div style={{ filter: "brightness(0) invert(1)" }}>
                <img src={rutaLogo} alt="Ruta Digital" style={{ height: col5H, width: "auto", display: "block" }} />
              </div>
            </div>
          )}

        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
