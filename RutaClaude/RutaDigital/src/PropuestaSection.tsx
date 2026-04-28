import { useState } from 'react'
import { motion } from 'motion/react'
import { MagneticLink } from './App'
import whatsappLogo from './assets/WhatsApp.svg.png'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const VIDEO_ID = '9ea959d63a625543f67c2b2c4470b71d'
const CF_BASE = `https://customer-r4sw48lpoy6mb2t1.cloudflarestream.com/${VIDEO_ID}`
const POSTER = `${CF_BASE}/thumbnails/thumbnail.jpg?time=&height=600`

export function PropuestaSection() {
  const [playing, setPlaying] = useState(false)

  const iframeSrc = playing
    ? `${CF_BASE}/iframe?autoplay=true&preload=auto&poster=${encodeURIComponent(POSTER)}`
    : `${CF_BASE}/iframe?preload=auto&poster=${encodeURIComponent(POSTER)}`

  return (
    <motion.div
      className="propuesta-wrap"
      id="propuesta"
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="propuesta-card">
        <motion.h2
          className="propuesta-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          Esta es nuestra propuesta
        </motion.h2>

        <motion.div
          className="propuesta-video-container"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        >
          <div className="propuesta-video-frame">
            <iframe
              src={iframeSrc}
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              className="propuesta-iframe"
            />

            {!playing && (
              <button
                type="button"
                className="propuesta-play-overlay"
                onClick={() => setPlaying(true)}
                aria-label="Reproducir video"
                style={{ backgroundImage: `url(${POSTER})` }}
              >
                <span className="propuesta-play-btn">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.5-6.86a.5.5 0 0 0 0-.84L8.77 4.72A.5.5 0 0 0 8 5.14z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          className="propuesta-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
        >
          <MagneticLink href="#servicios" className="cta-whatsapp" strength={0.25}>
            <img src={whatsappLogo} alt="" className="cta-whatsapp__icon" />
            Contactanos por Whatsapp
          </MagneticLink>
        </motion.div>
      </div>
    </motion.div>
  )
}
