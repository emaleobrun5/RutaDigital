import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react'
import rutaLogo from './assets/RUTADIgitalLogo.svg'
import whatsappLogo from './assets/WhatsApp.svg.png'
import { IntroPlayer } from './IntroPlayer'
import { PropuestaSection } from './PropuestaSection'
import { ServiciosSection, TICKER } from './ServiciosSection'
import { QuienesSomosSection } from './QuienesSomosSection'
import { AgendaSection } from './AgendaSection'
import { Footer } from './Footer'
import { HeroLogo } from './HeroLogo'
import { NavMenu } from './NavMenu'
import { ScrollProgress } from './ScrollProgress'
import { SalesChartAscii } from './SalesChartAscii'
import './App.css'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const TITLE_WORDS: { text: string; accent?: boolean }[] = [
  { text: 'Vendé' },
  { text: 'más' },
  { text: 'con' },
  { text: 'Marketing', accent: true },
  { text: 'Digital', accent: true },
  { text: '&' },
  { text: 'Inteligencia', accent: true },
  { text: 'Artificial', accent: true },
]

const heroTitleContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}

const heroWord = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.85, ease: EASE } },
}

export function MagneticLink({
  href,
  className,
  children,
  strength = 0.35,
}: {
  href: string
  className?: string
  children: ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 })

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left - rect.width / 2) * strength)
    my.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  )
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Detecta mobile para renderizar el gráfico ASCII solo ahí (evita RAF en desktop).
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Parallax del logo/ascii del hero al scrollear
  const { scrollY } = useScroll()
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -120])
  const heroParallaxOpacity = useTransform(scrollY, [0, 400], [1, 0.4])
  const heroParallaxScale = useTransform(scrollY, [0, 600], [1, 0.92])

  // Bloquea scroll y fuerza la vista al inicio mientras corre el intro
  useEffect(() => {
    if (introComplete) {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      return
    }
    const scrollY = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [introComplete])

  return (
    <>
      {!introComplete && <IntroPlayer onComplete={() => setIntroComplete(true)} />}
    <div className="page" style={{ visibility: introComplete ? 'visible' : 'hidden' }}>

      {/* ── NAVBAR ── */}
      <motion.nav
        className="nav"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <a href="#" className="logo">
          <img src={rutaLogo} alt="Ruta Digital" className="logo-img" />
          Ruta Digital
        </a>
        <div className="nav-actions">
          <a
            href="https://wa.me/59892745212?text=Hola%2C%20quiero%20hablar%20con%20ventas%20de%20Ruta%20Digital"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
          >
            Hablar con ventas
          </a>
         {/*<a href="#" className="pill-btn">Soy cliente</a>*/} 
          <button
            type="button"
            className="hamburger"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span /><span />
          </button>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <div className="hero-wrap">
        <div className="hero-card">

          {/* Left */}
          <div className="hero-left">
            <motion.h1
              className="hero-heading"
              variants={heroTitleContainer}
              initial="hidden"
              animate="visible"
            >
              {TITLE_WORDS.map((w, i) => (
                <span key={i} className="hero-word-mask">
                  <motion.span
                    className={`hero-word ${w.accent ? 'hero-word--accent' : ''}`}
                    variants={heroWord}
                  >
                    {w.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
            >
              Descubrí cómo una estrategia publicitaria y unas automatizaciones creadas a medida, pueden aumentar las ventas de tu negocio y abrir nuevos canales.
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
            >
              <MagneticLink href="#agenda" className="cta-primary">
                Conoce nuestras propuestas <span className="arr">→</span>
              </MagneticLink>
              <MagneticLink href="#servicios" className="cta-whatsapp" strength={0.25}>
                <img src={whatsappLogo} alt="" className="cta-whatsapp__icon" />
                Contactanos por Whatsapp
              </MagneticLink>
            </motion.div>
          </div>

          {/* Right — ASCII live dashboard */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            style={{ y: heroParallaxY, opacity: heroParallaxOpacity, scale: heroParallaxScale }}
          >
            <HeroLogo />
          </motion.div>

        </div>
      </div>

      {/* ── Entre hero y propuesta: ticker en desktop, ASCII chart en mobile ── */}
      {isMobile ? (
        <div className="sales-chart-between" aria-hidden="true">
          <SalesChartAscii className="sales-chart-inline" fps={12} intensity={1} />
        </div>
      ) : (
        <div className="ticker-bar">
          <motion.div
            className="ticker-track"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((name, i) => (
              <div key={i} className="ticker-item">{name}</div>
            ))}
          </motion.div>
        </div>
      )}

      <PropuestaSection />

      <ServiciosSection />
      <QuienesSomosSection />
      <AgendaSection />
      <Footer />

      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ScrollProgress />

    </div>
    </>
  )
}
