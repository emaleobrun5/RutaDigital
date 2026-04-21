import { motion } from 'motion/react'
import avatar from './assets/imagen.jpeg'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function QuienesSomosSection() {
  return (
    <section className="quienes-section" id="quienes">
      {/* Mesh gradient de fondo — blobs brand/cyan con blur */}
      <div className="quienes-mesh" aria-hidden="true">
        <span className="quienes-blob quienes-blob--a" />
        <span className="quienes-blob quienes-blob--b" />
        <span className="quienes-blob quienes-blob--c" />
      </div>

      <div className="quienes-card">
        <motion.p
          className="quienes-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          SOBRE NOSOTROS
        </motion.p>

        <motion.h2
          className="quienes-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          ¿Quiénes somos?
        </motion.h2>

        <motion.div
          className="quienes-body"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          <div className="quienes-avatar-wrap">
            <img src={avatar} alt="Emanuel Silveira" className="quienes-avatar" />
          </div>

          <div className="quienes-text-wrap">
            <p className="quienes-quote">
              "Somos un equipo de <strong>jóvenes apasionados</strong> por lo que hacen y{' '}
              <strong>comprometidos con una causa mayor</strong>. A través de esta agencia es que{' '}
              <strong>reunimos nuestros conocimientos y habilidades</strong> para{' '}
              <strong>entregarle un hiperservicio</strong> a nuestros clientes y hacer lo que mejor sabemos hacer."
            </p>
            <div className="quienes-author">
              <p className="quienes-name">Emanuel Silveira</p>
              <p className="quienes-role">CEO &amp; Founder</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
