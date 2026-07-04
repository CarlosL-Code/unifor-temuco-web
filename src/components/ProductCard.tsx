'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './ProductCard.module.css';
import { useRef } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  colors: string[];
}

const MotionLink = motion(Link);

export default function ProductCard({ id, name, category, imageSrc, colors }: ProductCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  // 3D tilt effect setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
    >
      <MotionLink
        ref={ref}
        href={`/producto/${id}`}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className={styles.imageWrapper} style={{ transform: "translateZ(30px)" }}>
          <Image src={imageSrc} alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={styles.image} />
          <div className={styles.overlay}>
            <span className={styles.consultBtn}>
              Ver Detalles
            </span>
          </div>
        </div>
        <div className={styles.details} style={{ transform: "translateZ(40px)" }}>
          <span className={styles.category}>{category}</span>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.colorPalette}>
            {colors.map((color, i) => (
              <span 
                key={i} 
                className={styles.colorSwatch} 
                style={{ backgroundColor: color }}
                title={`Color ${i}`}
              />
            ))}
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}
