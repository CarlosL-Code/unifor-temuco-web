'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import styles from './BentoCategories.module.css';

export default function BentoCategories() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div 
      className={styles.bentoGrid}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={item} className={`${styles.bentoItem} ${styles.large}`}>
        <Link href="/catalogo?categoria=Polerones">
          <div className={styles.bgImage} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200')" }}></div>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h3>Polerones</h3>
            <p>Comodidad para el día a día</p>
          </div>
        </Link>
      </motion.div>

      <motion.div variants={item} className={styles.bentoItem}>
        <Link href="/catalogo?categoria=Poleras">
          <div className={styles.bgImage} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800')" }}></div>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h3>Poleras</h3>
            <p>Frescura y estilo</p>
          </div>
        </Link>
      </motion.div>

      <motion.div variants={item} className={styles.bentoItem}>
        <Link href="/catalogo?categoria=Buzos">
          <div className={styles.bgImage} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516826957135-700ede19ebc1?auto=format&fit=crop&q=80&w=800')" }}></div>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h3>Buzos</h3>
            <p>Sport y colegial</p>
          </div>
        </Link>
      </motion.div>

      <motion.div variants={item} className={`${styles.bentoItem} ${styles.wide}`}>
        <Link href="/catalogo?categoria=Uniformes">
          <div className={styles.bgImage} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=1200')" }}></div>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h3>Uniformes</h3>
            <p>Viste a tu equipo con identidad</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
