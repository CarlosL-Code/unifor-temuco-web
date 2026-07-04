import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './product.module.css';

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  // Encontrar productos similares (misma categoría, excluyendo este)
  const similarProducts = await prisma.product.findMany({
    where: { 
      category: product.category,
      id: { not: product.id }
    },
    take: 4
  });

  const colors = JSON.parse(product.colors || '[]');
  const sizes = JSON.parse(product.sizes || '[]');

  // WhatsApp Pre-filled Message Builder
  const whatsappNumber = "56983748231";
  const whatsappMessage = `Hola UNIFOR, me interesa cotizar el siguiente producto:\n\n*${product.name}*\nCategoría: ${product.category}\nMaterial: ${product.material || 'N/A'}\n\nPor favor, envíame más información sobre precios por mayor.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', background: 'var(--surface)', minHeight: '100vh' }}>
        
        {/* Breadcrumb */}
        <div className="container" style={{ padding: '2rem 0 1rem 0' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Inicio &gt; Catálogo &gt; {product.category} &gt; <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{product.name}</span>
          </div>
        </div>

        {/* Product Detail Section */}
        <div className={`container ${styles.layout}`}>
          
          {/* Left: Image */}
          <div className={styles.imageContainer}>
            <Image src={product.imageSrc} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
          </div>

          {/* Right: Info */}
          <div>
            <span style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'var(--background)', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid var(--border)' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              {product.description || 'Producto premium de UNIFOR TEMUCO. Ideal para empresas, colegios y emprendedores. Confección nacional de alta calidad.'}
            </p>

            {product.material && (
              <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <strong>Material:</strong> {product.material}
              </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem' }}>Colores Disponibles:</h3>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                {colors.map((c: string, i: number) => (
                  <div key={i} style={{
                    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: c, border: '2px solid rgba(0,0,0,0.1)', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }} title={c} />
                ))}
              </div>
            </div>

            {sizes.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.8rem' }}>Curva de Tallas:</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {sizes.map((s: string, i: number) => (
                    <span key={i} style={{ padding: '0.5rem 1.2rem', border: '1px solid var(--border)', borderRadius: '4px', fontWeight: 600, background: 'var(--background)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Contáctame
            </a>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div style={{ background: 'var(--background)', padding: '5rem 0' }}>
            <div className="container">
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Productos Similares</h2>
              <div className={styles.similarGrid}>
                {similarProducts.map(sp => {
                  const spColors = JSON.parse(sp.colors || '[]');
                  return (
                    <ProductCard 
                      key={sp.id}
                      id={sp.id}
                      name={sp.name} 
                      category={sp.category} 
                      imageSrc={sp.imageSrc} 
                      colors={spColors} 
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
