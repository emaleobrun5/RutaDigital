import { motion } from 'motion/react'
import heroImg from './assets/fotogeneradacapcut.jpeg'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const FEATURES = [
  {
    tag: 'Personalización',
    title: 'Recomendaciones personalizadas con IA',
    img: heroImg,
  },
  {
    tag: 'Tendencias',
    title: 'Mirá qué está arrasando ahora mismo',
    img: heroImg,
  },
  {
    tag: 'Gestión de menú',
    title: 'Posicionamiento dinámico de ítems',
    img: heroImg,
  },
  {
    tag: 'Ventas inteligentes',
    title: 'Upsells y cross-sells potenciados por IA',
    img: heroImg,
  },
]

export function FeaturesSection() {
  return (
    <section className="features-section">
      <motion.p
        className="features-eyebrow"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        Funcionalidades clave
      </motion.p>

      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.tag}
            className="feature-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
          >
            <img src={f.img} alt={f.title} className="feature-card-img" />
            <div className="feature-card-overlay" />
            <div className="feature-card-content">
              <span className="feature-tag">{f.tag}</span>
              <h3 className="feature-title">{f.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
