import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import rutaLogo from "./assets/RUTADIgitalLogo.svg";

/**
 * Intro corta para mobile: ~2 segundos.
 *  · 0-14f  (0-0.47s):  fade-in + scale-in del logo centrado
 *  · 15-24f (0.5-0.8s): hold
 *  · 25-58f (0.83-1.93s): collapse — logo sube achicándose
 *  · 60f = 2s a 30fps
 */

const BRAND = "#1557FF";

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

export const MyCompositionMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrada del logo
  const logoOp = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const springIn = clamp01(
    spring({ frame, fps, config: { damping: 22, stiffness: 80, mass: 0.8 } })
  );
  const entryScale = 0.72 + springIn * 0.28; // 0.72 → 1

  // Collapse: sube y se achica entre 25-58f
  const collapseP = interpolate(frame, [25, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const yOffset   = -collapseP * 560;        // sube 560px
  const finalScale = entryScale * (1 - collapseP * 0.7); // achica hasta 30%
  const logoHeight = 180;

  return (
    <AbsoluteFill style={{ background: BRAND, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, calc(-50% + ${yOffset}px)) scale(${finalScale})`,
          opacity: logoOp,
          filter: "brightness(0) invert(1)",
        }}
      >
        <img
          src={rutaLogo}
          alt="Ruta Digital"
          style={{ height: logoHeight, width: "auto", display: "block" }}
        />
      </div>
    </AbsoluteFill>
  );
};
