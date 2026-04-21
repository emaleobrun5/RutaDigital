import { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import logo from '../../assets/IMAGENES/RUTADIGITALLogo.jpg.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.bar}>
          <a href="#top" className={styles.logo} aria-label="Ruta Digital">
            <img src={logo} alt="Ruta Digital" />
          </a>

          <div className={styles.actions}>
            <a href="#contacto" className={styles.cta}>Agenda tu llamada</a>
            <button
              type="button"
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Panel overlay estilo meandu */}
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}>
        <div className={styles.overlayInner}>
          <div className={styles.overlayGrid}>
            <div className={styles.overlayCol}>
              <span className={styles.colTitle}>Servicios</span>
              <ul>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}><span className={styles.dot}></span>Meta Ads</a></li>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}><span className={styles.dot}></span>Google Ads</a></li>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}><span className={styles.dot}></span>Email Marketing</a></li>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}><span className={styles.dot}></span>Contenido</a></li>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}><span className={styles.dot}></span>Embudos de venta</a></li>
                <li><a href="#servicios" onClick={() => setMenuOpen(false)}><span className={styles.dot}></span>Agentes de IA</a></li>
              </ul>
            </div>

            <div className={styles.overlayCol}>
              <span className={styles.colTitle}>Agencia</span>
              <ul>
                <li><a href="#quienes" onClick={() => setMenuOpen(false)}>Quiénes somos</a></li>
                <li><a href="#numeros" onClick={() => setMenuOpen(false)}>Resultados</a></li>
                <li><a href="#testimonios" onClick={() => setMenuOpen(false)}>Testimonios</a></li>
                <li><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.overlayFooter}>
            <div className={styles.overlayFooterBtns}>
              <a href="#contacto" onClick={() => setMenuOpen(false)} className={styles.overlaySignIn}>
                Agendar llamada
              </a>
              <a href="#contacto" onClick={() => setMenuOpen(false)} className={styles.overlayCta}>
                Contacto →
              </a>
            </div>
            <div className={styles.overlaySocial}>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">IN</a>
              <a href="#" aria-label="WhatsApp">WA</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
