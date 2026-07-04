import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Logo & About */}
          <div className={styles.col}>
            <h3 className={styles.brand}>UNIFOR®</h3>
            <p className={styles.description}>
              Ropa lisa premium para tu marca. Confección de alta calidad, stock permanente y los mejores colores. Ideal para estampadores, colegios, empresas y emprendedores.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className={styles.col}>
            <h4 className={styles.title}>Contacto & Ubicación</h4>
            <ul className={styles.list}>
              <li>
                <strong>Dirección:</strong><br />
                Gral. Aldunate 341,<br />
                Al lado del Mercado Modelo,<br />
                Temuco.
              </li>
              <li>
                <strong>WhatsApp:</strong><br />
                <a href="https://wa.me/56983748231" target="_blank" rel="noopener noreferrer">
                  +56 9 83748231
                </a>
              </li>
            </ul>
          </div>
          
          {/* Schedule */}
          <div className={styles.col}>
            <h4 className={styles.title}>Horario de Atención</h4>
            <div className={styles.schedule}>
              <div className={styles.scheduleRow}>
                <span>Lunes a Viernes</span>
                <strong>10:00 - 19:00</strong>
              </div>
              <div className={styles.scheduleRow}>
                <span>Sábado</span>
                <strong>10:00 - 18:00</strong>
              </div>
              <div className={styles.scheduleRow}>
                <span>Domingo</span>
                <strong style={{ color: 'var(--unifor-orange)' }}>Cerrado</strong>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} UNIFOR TEMUCO. Todos los derechos reservados.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Desarrollado por <a href="https://carloslozanodev.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--unifor-blue)', textDecoration: 'none', fontWeight: 600 }}>Carlos Lozano</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
