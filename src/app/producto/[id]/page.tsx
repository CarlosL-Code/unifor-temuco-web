import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', paddingBottom: '5rem', alignItems: 'start' }}>
          
          {/* Left: Image */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <Image src={product.imageSrc} alt={product.name} fill style={{ objectFit: 'cover' }} />
          </div>

          {/* Right: Info */}
          <div>
            <span style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'var(--background)', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem', border: '1px solid var(--border)' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
            
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

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              width: '100%',
              background: '#25D366', // WhatsApp Green
              color: 'white',
              textAlign: 'center',
              padding: '1.2rem',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
              transition: 'transform 0.2s'
            }}>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div style={{ background: 'var(--background)', padding: '5rem 0' }}>
            <div className="container">
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Productos Similares</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
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
