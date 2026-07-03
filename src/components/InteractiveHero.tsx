'use client';

import { motion } from 'framer-motion';
import styles from './InteractiveHero.module.css';
import Link from 'next/link';

export default function InteractiveHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className={styles.heroSection}>
      <motion.div 
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.title} variants={itemVariants}>
          Viste con <span className="text-gradient">Colores Vibrantes</span>
        </motion.h1>
        
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Fabricantes directos de ropa lisa premium en Temuco. Diseños frescos, tela de alta calidad y una amplia gama de colores cálidos para que tu marca, colegio o empresa destaquen.
        </motion.p>
        
        <motion.div className={styles.actions} variants={itemVariants}>
          <Link href="#catalogo" className={styles.primaryBtn}>
            Explorar Catálogo
          </Link>
          <Link href="#contacto" className={styles.secondaryBtn}>
            Cotizar al por Mayor
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating images/decorations for the modern warm look */}
      <motion.div 
        className={styles.decoration1}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Usamos un div con borde redondeado estilo "blob" y sombra cálida */}
      </motion.div>
      <motion.div 
        className={styles.decoration2}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </section>
  );
}
