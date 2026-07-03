import Navbar from '@/components/Navbar';
import AnimatedSection from '@/components/AnimatedSection';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      
      <PageHeader 
        title="Sobre Nosotros" 
        subtitle="Conoce la historia detrás de UNIFOR TEMUCO, tu aliado estratégico en indumentaria y ropa lisa premium." 
        imageSrc="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=2000" 
      />

      <main style={{ background: 'var(--surface)', minHeight: '50vh' }}>

        {/* Content Section */}
        <section style={{ padding: '6rem 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            <AnimatedSection>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <Image 
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200" 
                  alt="Tienda UNIFOR" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                  Fabricantes Directos
                </h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  En <strong>UNIFOR TEMUCO</strong> nos dedicamos a la fabricación y comercialización de ropa lisa de la más alta calidad. Nuestro enfoque está en brindar las mejores prendas para que emprendedores, colegios, empresas y estampadores puedan plasmar su identidad.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  Contamos con un amplio stock permanente, una inmensa paleta de colores y un equipo dedicado a asegurar que cada prenda cumpla con los estándares más exigentes del mercado.
                </p>
                
                <Link href="/mayoristas" style={{
                  display: 'inline-block',
                  background: 'var(--unifor-blue)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s'
                }}>
                  Ventas por Mayor
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </section>

      </main>
    </>
  );
}
