import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.uLogo}>U</span>
          UNIFOR<sup style={{ fontSize: '0.4em', marginLeft: '2px' }}>®</sup>
        </Link>
        
        <ul className={styles.navLinks}>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/catalogo">Catálogo</Link></li>
          <li><Link href="/nosotros">Nosotros</Link></li>
          <li><Link href="/mayoristas">Mayoristas</Link></li>
        </ul>
        
        <div className={styles.navActions}>
          <ThemeToggle />
          <a href="https://wa.me/56983748231" target="_blank" rel="noopener noreferrer" className={styles.contactBtn}>
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
