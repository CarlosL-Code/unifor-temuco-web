'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular factores de animación
  // Escala de la imagen (crece al hacer scroll)
  const scale = Math.max(1, 1 + scrollY * 0.002);
  // Opacidad del texto (desaparece al hacer scroll hacia abajo)
  const textOpacity = Math.max(0, 1 - scrollY * 0.003);
  // Movimiento Y de la imagen (efecto parallax/sticky)
  const translateY = scrollY * 0.5;

  return (
    <section className={styles.heroSection} ref={heroRef}>
      <div 
        className={styles.imageContainer}
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        {/* Usamos un div con background por ahora como placeholder de la prenda/vaso */}
        <div className={styles.heroImagePlaceholder}>
           {/* Aquí irá la imagen 3D generada o real de la prenda */}
           <div className={styles.garmentMock}>
             <span className="text-gradient" style={{ fontSize: '4rem', fontWeight: 'bold' }}>U</span>
           </div>
        </div>
      </div>

      <div 
        className={`container ${styles.content}`}
        style={{ opacity: textOpacity, transform: `translateY(-${scrollY * 0.2}px)` }}
      >
        <h1 className={styles.title}>
          Viste con <span className="text-gradient">Calidad Premium</span>
        </h1>
        <p className={styles.subtitle}>
          Fabricantes directos de ropa lisa. Diseño minimalista, comodidad absoluta y los mejores colores para destacar.
        </p>
        <div className={styles.actions}>
          <a href="#catalogo" className={styles.primaryBtn}>
            Ver Catálogo
          </a>
          <a href="#contacto" className={styles.secondaryBtn}>
            Cotizar Mayorista
          </a>
        </div>
      </div>
    </section>
  );
}
