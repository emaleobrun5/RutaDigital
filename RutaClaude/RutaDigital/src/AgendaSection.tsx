import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const CALENDLY_URL = 'https://calendly.com/emasilveira3/30min'
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: Element }) => void
    }
  }
}

const CalendarIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
  </svg>
)

export function AgendaSection() {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = widgetRef.current
    if (!el) return

    const init = () => {
      if (!widgetRef.current || !window.Calendly) return
      widgetRef.current.innerHTML = ''
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      })
    }

    // CSS oficial de Calendly (si no está cargado)
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_CSS
      document.head.appendChild(link)
    }

    // Ya disponible
    if (window.Calendly) {
      init()
      return
    }

    // Script ya en DOM pero aún cargando
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT}"]`
    )
    if (existing) {
      existing.addEventListener('load', init)
      return () => existing.removeEventListener('load', init)
    }

    // Cargar script por primera vez
    const s = document.createElement('script')
    s.src = CALENDLY_SCRIPT
    s.async = true
    s.onload = init
    document.body.appendChild(s)
  }, [])

  return (
    <section className="agenda-section" id="agenda">
      <motion.div
        className="agenda-icon-badge"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <CalendarIcon size={26} />
      </motion.div>

      <motion.h2
        className="agenda-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
      >
        Agenda tu llamada
      </motion.h2>

      <motion.p
        className="agenda-sub"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
      >
        Si quieres <strong>dar el siguiente paso</strong> con tus ventas,{' '}
        <strong>agenda tu llamada</strong> ahora y descubramos como podemos ayudarte.
      </motion.p>

      <motion.div
        className="agenda-calendar"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
      >
        <div
          ref={widgetRef}
          style={{ minWidth: 320, height: 700, width: '100%' }}
        />
      </motion.div>
    </section>
  )
}
