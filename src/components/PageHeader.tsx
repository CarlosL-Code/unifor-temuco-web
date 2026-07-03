'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export default function PageHeader({ title, subtitle, imageSrc }: PageHeaderProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className={styles.header}>
      <motion.div 
        className={styles.bgImage}
        style={{ 
          backgroundImage: `url('${imageSrc}')`,
          y 
        }}
      />
      <div className={styles.overlay}></div>
      
      <div className={`container ${styles.content}`}>
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}
