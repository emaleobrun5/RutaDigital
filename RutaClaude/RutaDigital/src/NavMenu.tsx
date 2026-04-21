import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import rutaLogo from './assets/RUTADIgitalLogo.svg'

/**
 * NavMenu — Menú desplegable del navbar.
 *
 * Props:
 *  - open:    si el menú está visible
 *  - onClose: callback para cerrar
 *
 * Comportamiento:
 *  · Se cierra al hacer click en el backdrop, la X, o presionar Escape.
 *  · Los pills "Hablar con ventas" / "Soy cliente" solo aparecen en mobile
 *    (en desktop están en el navbar, fuera del menú).
 *  · Click en un servicio → cambia el tab en ServiciosSection via hash.
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

type Item = { label: string; href: string; dot?: 'brand' | 'cyan' | 'mix' }

const SERVICES: Item[] = [
  { label: 'Publicidad Digital', href: '#servicios-publicidad', dot: 'brand' },
  { label: 'Contenido',          href: '#servicios-contenido',  dot: 'cyan'  },
  { label: 'Embudos de Venta',   href: '#servicios-embudos',    dot: 'mix'   },
  { label: 'Agentes de IA',      href: '#servicios-ia',         dot: 'brand' },
  { label: 'Desarrollo Web',     href: '#servicios-web',        dot: 'cyan'  },
]

const COMPANY: Item[] = [
  { label: 'Sobre nosotros',   href: '#quienes',   dot: 'brand' },
  { label: 'Nuestra propuesta', href: '#propuesta', dot: 'cyan'  },
  { label: 'Agendar llamada',  href: '#agenda',    dot: 'mix'   },
]

const panel = {
  hidden:  { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.03, delayChildren: 0.08 },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.25, ease: EASE } },
}

const item = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

export function NavMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Escape para cerrar + lock scroll
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const handleLinkClick = () => {
    // Pequeño delay para que el scroll/hash se dispare, después cierra
    setTimeout(onClose, 60)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="nav-menu-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="nav-menu-panel"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
          >
            <button className="nav-menu-close" onClick={onClose} aria-label="Cerrar menú">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="nav-menu-grid">
              <motion.section className="nav-menu-col" variants={item}>
                <h3 className="nav-menu-heading">Servicios</h3>
                <ul className="nav-menu-list">
                  {SERVICES.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} className="nav-menu-item" onClick={handleLinkClick}>
                        <span className={`nav-menu-dot dot-${s.dot}`} />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section className="nav-menu-col" variants={item}>
                <h3 className="nav-menu-heading">Empresa</h3>
                <ul className="nav-menu-list">
                  {COMPANY.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} className="nav-menu-item" onClick={handleLinkClick}>
                        <span className={`nav-menu-dot dot-${s.dot}`} />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>

                
              </motion.section>
            </div>

            <motion.div className="nav-menu-footer" variants={item}>
              <div className="nav-menu-actions">
                <a
                  href="https://wa.me/59892745212?text=Hola%2C%20quiero%20hablar%20con%20ventas%20de%20Ruta%20Digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn pill-btn--light"
                  onClick={handleLinkClick}
                >
                  Hablar con ventas
                </a>
                <a href="#" className="pill-btn" onClick={handleLinkClick}>
                  Soy cliente
                </a>
              </div>

              <div className="nav-menu-socials">
                <a
                  href="https://instagram.com/rutadigital_uy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @rutadigital_uy"
                  className="nav-menu-social"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="mailto:rutadigitaluy@gmail.com" aria-label="Email" className="nav-menu-social">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.a
              href="#agenda"
              className="nav-menu-contact"
              onClick={handleLinkClick}
              variants={item}
            >
              <div className="nav-menu-contact-overlay" />
              <img src={rutaLogo} alt="Ruta Digital" className="nav-menu-contact-mark" />
              <div className="nav-menu-contact-inner">
                <span className="nav-menu-contact-label">
                  Contacto <span className="arr">↗</span>
                </span>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
