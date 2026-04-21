import styles from './Hero.module.css';

function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`${styles.grid} container`}>
        {/* LADO IZQUIERDO */}
        <div className={styles.left}>
          <span className={`eyebrow ${styles.eyebrow}`}>
            Marketing digital + IA
          </span>

          <h1 className={styles.headline}>
            Vendé más con<br />
            estrategia, contenido<br />
            e <em className={styles.em}>inteligencia artificial</em>.
          </h1>

          <p className={styles.sub}>
            Creamos y optimizamos campañas, embudos y automatizaciones que
            generan ventas reales, sin humo y con números sobre la mesa.
          </p>

          <div className={styles.ctaRow}>
            <a href="#contacto" className={styles.ctaPrimary}>
              Agendá tu llamada
              <span className={styles.arrow}>→</span>
            </a>
            <a href="#servicios" className={styles.ctaGhost}>
              Ver servicios
            </a>
          </div>

          {/* PLATAFORMAS en el hero (como meandu "as featured in") */}
          <div className={styles.featured}>
            <span className={styles.featuredLabel}>Con experiencia en</span>
            <div className={styles.featuredLogos}>
              <span>Meta Ads</span>
              <span>·</span>
              <span>Google Ads</span>
              <span>·</span>
              <span>TikTok</span>
              <span>·</span>
              <span>WhatsApp API</span>
            </div>
          </div>
        </div>

        {/* LADO DERECHO — imagen grande */}
        <div className={styles.right}>
          <div className={styles.imageBox}>
            {/* PLANTILLA: imagen del equipo / oficina / trabajo */}
            <div className={styles.imagePlaceholder}>
              <span>Imagen del equipo o<br/>proceso de trabajo</span>
              <small>reemplazar en /assets/hero-main.jpg</small>
            </div>
          </div>
          {/* Sticker flotante */}
          <div className={styles.sticker}>
            <span className={styles.stickerNum}>+200k</span>
            <span className={styles.stickerLabel}>en ventas al mes<br/>para nuestros clientes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
