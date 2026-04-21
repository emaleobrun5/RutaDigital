import styles from './Clientes.module.css';

/*
 * PLANTILLA PARA RELLENAR
 * Reemplazá estos slots por los logos reales de tus clientes.
 * Ideal: PNG/SVG transparentes, 120-160px de ancho.
 */
const clientes = [
  { name: 'Cliente 1', logo: null },
  { name: 'Cliente 2', logo: null },
  { name: 'Cliente 3', logo: null },
  { name: 'Cliente 4', logo: null },
  { name: 'Cliente 5', logo: null },
  { name: 'Cliente 6', logo: null },
  { name: 'Cliente 7', logo: null },
  { name: 'Cliente 8', logo: null },
];

function Clientes() {
  // Duplicamos para el efecto marquee infinito
  const loop = [...clientes, ...clientes];

  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.label}>
          <span className={styles.labelLine}></span>
          Empresas que confían en nosotros
          <span className={styles.labelLine}></span>
        </p>
      </div>

      <div className={styles.track}>
        <div className={styles.strip}>
          {loop.map((c, i) => (
            <div key={i} className={styles.item}>
              {c.logo ? (
                <img src={c.logo} alt={c.name} />
              ) : (
                <span className={styles.slot}>{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clientes;
