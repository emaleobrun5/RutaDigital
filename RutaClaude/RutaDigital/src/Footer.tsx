import { motion } from 'motion/react'
import rutaLogo from './assets/RUTADIgitalLogo.svg'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="footer-logo">
            <img src={rutaLogo} alt="Ruta Digital" />
            <span>Ruta Digital</span>
          </div>
          <p className="footer-tagline">
            Marketing digital e Inteligencia Artificial para empresas que quieren crecer.
          </p>
        </motion.div>

        <motion.nav
          className="footer-links"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          <p className="footer-label">NAVEGACIÓN</p>
          <a href="#servicios">Servicios</a>
          <a href="#agenda">Agendar llamada</a>
          <a href="#">Sobre nosotros</a>
        </motion.nav>

        <motion.div
          className="footer-contact"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        >
          <p className="footer-label">CONTACTO</p>
          <a href="tel:+59892745212" className="footer-contact-item">
            +598 92 745 212
          </a>
          <a href="mailto:rutadigitaluy@gmail.com" className="footer-contact-item footer-contact-email">
            rutadigitaluy@gmail.com
          </a>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Ruta Digital. Todos los derechos reservados.</p>
        <p className="footer-made">Ruta Digital IT - Emanuel De Leon</p>
      </div>
    </footer>
  )
}
