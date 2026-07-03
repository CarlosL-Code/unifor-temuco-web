import Link from 'next/link';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  name: string;
  href: string;
  imageSrc?: string;
}

export default function CategoryCard({ name, href, imageSrc }: CategoryCardProps) {
  // Asignamos fondos por defecto si no se proporciona uno (usando fotos de stock para ropa)
  const defaultImages: Record<string, string> = {
    'Polerones': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    'Poleras': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    'Buzos': 'https://images.unsplash.com/photo-1516826957135-700ede19ebc1?auto=format&fit=crop&q=80&w=600',
    'Uniformes': 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=600',
  };

  const bgImage = imageSrc || defaultImages[name] || defaultImages['Poleras'];

  return (
    <Link href={href} className={styles.card} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles.overlay}></div>
      <span className={styles.title}>{name}</span>
    </Link>
  );
}
