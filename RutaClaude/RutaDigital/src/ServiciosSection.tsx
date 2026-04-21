import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const TICKER = [
  'ESTRATEGIA', 'AGENTES DE IA', 'GOOGLE ADS', 'META ADS',
  'EMAIL MARKETING', 'DESARROLLO WEB', 'EMBUDOS',
]

type Tab = {
  id: string
  label: string
  icon: string
  subtitle: string
  cards: { title: string; text: string }[]
}

const TABS: Tab[] = [
  {
    id: 'publicidad',
    label: 'Publicidad Digital',
    icon: '📣',
    subtitle: 'Creamos, testeamos y optimizamos tu estrategia publicitaria en las principales plataformas digitales.',
    cards: [
      { title: 'Meta Ads', text: 'Utilizamos nuestras estrategias probadas para entregarte los resultados que buscas, ya sean ventas, clientes potenciales o reconocimiento.' },
      { title: 'Google Ads', text: 'Realizamos tus estrategias de SEO y SEM para que cuando tu cliente potencial busque tu servicio, seas el primero en aparecer.' },
      { title: 'Email Marketing', text: 'La más confiable y más antigua herramienta del marketing digital para conseguir que te compren una vez y que te vuelvan a comprar.' },
    ],
  },
  {
    id: 'contenido',
    label: 'Contenido',
    icon: '📷',
    subtitle: 'Creamos contenido que impacta, pero sobretodo, que funciona.',
    cards: [
      { title: 'Fotografía y Video Profesionales', text: 'La calidad audiovisual de tu contenido es un factor indispensable para que tus anuncios funcionen bien. También nos encargamos de eso.' },
      { title: 'Contenido que Convierte', text: 'Puedes hacer contenido muy bonito pero que no consigue los resultados que buscas. Con nuestro método de contenido nos aseguramos la conversión deseada.' },
      { title: 'Programación a distancia', text: 'En caso que tengas tu equipo de grabación, te podemos enviar a detalle sobre como realizar nuestro método.' },
    ],
  },
  {
    id: 'embudos',
    label: 'Embudos de Venta',
    icon: '📈',
    subtitle: 'Ya no basta solo hacer unas campañas y unos reels, se necesita una estrategia.',
    cards: [
      { title: 'Embudos de venta', text: 'Este término hace referencia al recorrido que todos los clientes realizan desde que no te conocen, hasta que te compran. Con nuestros embudos nos aseguramos que ese camino sea lo más eficaz posible.' },
      { title: 'Adaptado a tus objetivos', text: 'Adaptamos nuestros embudos personalizados a tus objetivos y a tu caso específico, ya sea que busques ventas, reconocimiento, tráfico o visibilidad.' },
    ],
  },
  
  {
    id: 'web',
    label: 'Desarrollo Web',
    icon: '💻',
    subtitle: 'Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.',
    cards: [
      { title: 'Landing Pages de Alto Impacto', text: 'Diseñamos landings pensadas en la conversión, con copy persuasivo, diseño moderno y performance impecable en todos los dispositivos.' },
      { title: 'Webs Corporativas a Medida', text: 'Tu presencia online lo es todo. Desarrollamos sitios rápidos, SEO-friendly y con una identidad visual alineada a tu marca.' },
      { title: 'E-commerce y Integraciones', text: 'Tiendas online conectadas a tus pasarelas de pago, CRM y herramientas de marketing para que vendas 24/7 sin fricciones.' },
    ],
  },
]

export function ServiciosSection() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const current = TABS.find((t) => t.id === activeTab) ?? TABS[0]
  const doubled = [...TICKER, ...TICKER, ...TICKER]

  // Permite abrir un tab específico desde otro componente (ej. NavMenu)
  // via hash `#servicios-<id>` (publicidad, contenido, embudos, ia, web).
  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#servicios-([a-z]+)$/)
      if (!m) return
      const id = m[1]
      if (TABS.some((t) => t.id === id)) {
        setActiveTab(id)
        document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  return (
    <section className="servicios-section" id="servicios">
      {/* Ticker */}
      <div className="servicios-ticker">
        <motion.div
          className="servicios-ticker-track"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((t, i) => (
            <div key={i} className="servicios-ticker-item">
              <span>{t}</span>
              <span className="servicios-ticker-dot">◆</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="servicios-card">
        <motion.p
          className="servicios-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          LO QUE HACEMOS
        </motion.p>

        <motion.h2
          className="servicios-title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          Nuestros servicios
        </motion.h2>

        <motion.div
          className="servicios-tabs"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`servicios-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="servicios-tab-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="servicios-tab-content">
                <span className="servicios-tab-icon">{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="servicios-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <motion.p
              className="servicios-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            >
              {current.subtitle}
            </motion.p>

            <motion.div
              className="servicios-grid"
              style={{
                gridTemplateColumns: `repeat(${Math.min(current.cards.length, 3)}, minmax(0, 1fr))`,
              }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
              }}
            >
              {current.cards.map((card) => (
                <motion.div
                  key={card.title}
                  className="servicio-card"
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: -18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.65, ease: EASE },
                    },
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE } }}
                >
                  <div className="servicio-card-glow" />
                  <h3 className="servicio-card-title">{card.title}</h3>
                  <p className="servicio-card-text">{card.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#agenda"
              className="servicios-cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
              whileHover={{ y: -3 }}
            >
              Contactanos <span className="arr">→</span>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
