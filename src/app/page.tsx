import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import FeaturesStrip from '@/components/FeaturesStrip';
import BentoCategories from '@/components/BentoCategories';
import ProductCard from '@/components/ProductCard';
import AnimatedSection from '@/components/AnimatedSection';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Home() {
  let products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4 // Mostrar solo 4 en el Home
  });

  // Semilla de prueba con la nueva estructura de la base de datos
  if (products.length === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: 'Polerón Canguro Clásico',
          category: 'Polerones',
          imageSrc: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
          colors: JSON.stringify(['#fbc531', '#718093', '#2d3436']),
          sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
          material: 'Algodón Premium',
          description: 'Polerón de calce clásico con bolsillo canguro. Ideal para estampar tu marca o bordar logotipos de empresas. Costuras reforzadas.'
        },
        {
          name: 'Polera Algodón Peinado',
          category: 'Poleras',
          imageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
          colors: JSON.stringify(['#ffffff', '#00a8ff', '#e15f41']),
          sizes: JSON.stringify(['S', 'M', 'L']),
          material: '100% Algodón Peinado',
          description: 'Polera de cuello redondo muy suave al tacto. Especial para uniformes y uso diario. No encoge al lavar.'
        },
        {
          name: 'Buzo Jogger Urbano',
          category: 'Buzos',
          imageSrc: 'https://images.unsplash.com/photo-1516826957135-700ede19ebc1?auto=format&fit=crop&q=80&w=800',
          colors: JSON.stringify(['#2d3436', '#718093']),
          sizes: JSON.stringify(['M', 'L', 'XL', 'XXL']),
          material: 'Franela Franela',
          description: 'Pantalón de buzo corte jogger con cordón ajustable y puños. Muy cómodo para colegios o equipos deportivos.'
        },
        {
          name: 'Polera Deportiva DryFit',
          category: 'Poleras',
          imageSrc: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
          colors: JSON.stringify(['#00a8ff', '#ffffff']),
          sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
          material: 'Poliéster DryFit',
          description: 'Polera de secado rápido, transpirable y ligera. Diseñada para actividades deportivas de alto rendimiento.'
        },
      ]
    });
    
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4
    });
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        
        <AnimatedSection delay={0.2}>
          <FeaturesStrip />
        </AnimatedSection>
        
        <section id="categorias" style={{ padding: '8rem 0', background: 'var(--background)' }}>
          <div className="container">
            <AnimatedSection>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
                Nuestras Líneas
              </h2>
            </AnimatedSection>
            
            {/* Componente dinámico de Categorías tipo Bento */}
            <BentoCategories />
          </div>
        </section>

        <section id="catalogo" style={{ background: 'var(--surface)', padding: '6rem 0 6rem 0' }}>
          <div className="container">
            <AnimatedSection>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
                Catálogo Destacado
              </h2>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.2rem' }}>
                Explora nuestros productos más solicitados con stock inmediato.
              </p>
            </AnimatedSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
              {products.length > 0 ? (
                products.map((product, index) => {
                  const colors = JSON.parse(product.colors);
                  return (
                    <AnimatedSection key={product.id} delay={index * 0.1}>
                      <ProductCard 
                        id={product.id}
                        name={product.name} 
                        category={product.category} 
                        imageSrc={product.imageSrc} 
                        colors={colors} 
                      />
                    </AnimatedSection>
                  );
                })
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>Agrega productos desde el panel de administración.</p>
              )}
            </div>
            
            <AnimatedSection delay={0.3}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="/catalogo" style={{
                  background: 'var(--foreground)',
                  color: 'var(--background)',
                  padding: '1.2rem 3.5rem',
                  borderRadius: '50px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                  Explorar Catálogo Completo
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  );
}
