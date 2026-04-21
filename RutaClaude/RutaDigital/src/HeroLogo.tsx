import { useMemo } from 'react'
import { motion } from 'motion/react'
import logoUrl from './assets/RUTADIgitalLogo.svg'

/**
 * HeroLogo — Animación cinematográfica del logo de Ruta Digital.
 *
 * Capas (todas opcionales y independientes):
 *  · Halo radial pulsante detrás del logo (breathing)
 *  · Anillos concéntricos expansivos
 *  · Partículas orbitando en trayectorias circulares (varias velocidades)
 *  · Silueta base del logo apagada
 *  · Liquid fill: gradient brand → cyan que sube rellenando desde abajo
 *  · Shimmer: destello diagonal que recorre el logo periódicamente
 *  · Scan line horizontal cyan que barre el logo (tipo CRT)
 *
 * Props (todas opcionales y configurables):
 *  - fillDuration:     segundos que tarda el liquid fill (default 2.6)
 *  - fillDelay:        segundos antes de que el fill arranque (default 0.6)
 *  - particleCount:    cantidad de partículas orbitando (default 16)
 *  - intensity:        multiplicador de brillo / opacidad general (default 1)
 *  - className:        clase CSS extra
 *
 * Colores: NUNCA hardcodeados. Todos leídos desde variables CSS
 * (--brand, --brand-l, --cyan, --muted, --light) definidas en App.css.
 *
 * Cleanup: el componente no registra timers propios — usa framer-motion
 * y keyframes CSS que se limpian automáticamente al desmontar.
 */

export type HeroLogoProps = {
  fillDuration?: number
  fillDelay?: number
  particleCount?: number
  intensity?: number
  className?: string
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const EASE_FILL = [0.45, 0, 0.3, 1] as [number, number, number, number]

type Particle = {
  orbitDuration: number
  startAngle: number
  radius: number
  size: number
  reverse: boolean
  hot: boolean
}

export function HeroLogo({
  fillDuration = 2.6,
  fillDelay = 0.6,
  particleCount = 16,
  intensity = 1,
  className = '',
}: HeroLogoProps) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: particleCount }, (_, i) => {
        const rnd = (min: number, max: number) => min + Math.random() * (max - min)
        return {
          orbitDuration: rnd(9, 22),
          startAngle: rnd(0, 360),
          radius: rnd(46, 58),
          size: rnd(2, 4.2),
          reverse: i % 2 === 0,
          hot: Math.random() > 0.55,
        }
      }),
    [particleCount]
  )

  const maskStyle = {
    maskImage: `url(${logoUrl})`,
    WebkitMaskImage: `url(${logoUrl})`,
  } as const

  return (
    <div
      className={`hero-logo ${className}`.trim()}
      style={{ opacity: intensity }}
      aria-label="Ruta Digital"
    >
      {/* Halo radial pulsante */}
      <motion.div
        className="hero-logo-halo"
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 3.4, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Anillos expansivos */}
      <div className="hero-logo-rings" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="hero-logo-ring"
            style={{ animationDelay: `${i * 1.3}s` }}
          />
        ))}
      </div>

      {/* Partículas orbitando */}
      <div className="hero-logo-orbit" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero-logo-orbiter"
            style={{
              animationDuration: `${p.orbitDuration}s`,
              animationDirection: p.reverse ? 'reverse' : 'normal',
              animationDelay: `-${(p.startAngle / 360) * p.orbitDuration}s`,
            }}
          >
            <span
              className={`hero-logo-particle ${p.hot ? 'is-hot' : ''}`}
              style={{
                width: p.size,
                height: p.size,
                transform: `translateX(${p.radius}%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Cuerpo del logo con mask */}
      <motion.div
        className="hero-logo-body"
        style={maskStyle}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      >
        {/* Silueta base apagada */}
        <div className="hero-logo-base" />

        {/* Liquid fill subiendo */}
        <motion.div
          className="hero-logo-fill"
          initial={{ y: '102%' }}
          animate={{ y: '0%' }}
          transition={{ duration: fillDuration, ease: EASE_FILL, delay: fillDelay }}
        />

        {/* Shimmer diagonal */}
        <div
          className="hero-logo-shimmer"
          style={{ animationDelay: `${fillDelay + fillDuration + 0.2}s` }}
        />

        {/* Scan line */}
        <div
          className="hero-logo-scan"
          style={{ animationDelay: `${fillDelay + fillDuration + 0.6}s` }}
        />
      </motion.div>
    </div>
  )
}

/* ── ejemplo de uso ──────────────────────────────────
 *
 *   import { HeroLogo } from './HeroLogo'
 *
 *   // default — 2.6s de fill, 16 partículas
 *   <HeroLogo />
 *
 *   // arranque rápido con más partículas
 *   <HeroLogo fillDuration={1.8} fillDelay={0.2} particleCount={24} />
 *
 *   // modo sutil
 *   <HeroLogo intensity={0.7} particleCount={8} />
 *
 * ─────────────────────────────────────────────────── */
