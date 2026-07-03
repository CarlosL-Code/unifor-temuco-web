'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className={styles.hero}>
      {/* Background Image with Parallax */}
      <motion.div 
        className={styles.bgImage}
        style={{ y }}
      />
      
      <div className={styles.overlay}></div>
      
      <div className={`container ${styles.content}`}>
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={styles.textWrapper}
        >
          <span className={styles.badge}>Nueva Colección 2026</span>
          <h1 className={styles.title}>
            Ropa Lisa<br />Premium
          </h1>
          <p className={styles.subtitle}>
            Diseñamos y fabricamos prendas de la más alta calidad para que tu marca destaque. Stock permanente y los mejores colores del mercado.
          </p>
          
          <div className={styles.actions}>
            <Link href="/catalogo" className={styles.primaryBtn}>
              Ver Catálogo
            </Link>
            <Link href="/mayoristas" className={styles.secondaryBtn}>
              Ventas al por Mayor
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </motion.div>
    </section>
  );
}
