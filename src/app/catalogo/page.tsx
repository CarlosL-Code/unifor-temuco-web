import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import styles from './catalogo.module.css';

export default async function CatalogPage(props: {
  searchParams: Promise<{ categoria?: string; color?: string; talla?: string; material?: string }>;
}) {
  const resolvedParams = await props.searchParams;
  const { categoria, color, talla, material } = resolvedParams;

  // Construir filtros de Prisma basados en los searchParams
  const where: any = {};
  if (categoria) {
    where.category = { equals: categoria };
  }
  
  if (material) {
    where.material = { contains: material };
  }

  // Fetch products
  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  let filteredProducts = products;
  
  if (color) {
    filteredProducts = filteredProducts.filter(p => {
      const colors = JSON.parse(p.colors || '[]');
      return colors.includes(color);
    });
  }

  if (talla) {
    filteredProducts = filteredProducts.filter(p => {
      if (!p.sizes) return false;
      const sizes = JSON.parse(p.sizes);
      return sizes.includes(talla);
    });
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', background: 'var(--background)', minHeight: 'calc(100vh - 400px)' }}>
        
        <div className={`container ${styles.layout}`}>
          
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Filtros</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-muted)' }}>CATEGORÍAS</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><Link href="/catalogo" style={{ color: !categoria ? 'var(--unifor-blue)' : 'inherit', textDecoration: 'none', fontWeight: !categoria ? 700 : 400 }}>Todas</Link></li>
                <li><Link href="/catalogo?categoria=Polerones" style={{ color: categoria === 'Polerones' ? 'var(--unifor-blue)' : 'inherit', textDecoration: 'none' }}>Polerones</Link></li>
                <li><Link href="/catalogo?categoria=Poleras" style={{ color: categoria === 'Poleras' ? 'var(--unifor-blue)' : 'inherit', textDecoration: 'none' }}>Poleras</Link></li>
                <li><Link href="/catalogo?categoria=Buzos" style={{ color: categoria === 'Buzos' ? 'var(--unifor-blue)' : 'inherit', textDecoration: 'none' }}>Buzos</Link></li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-muted)' }}>TALLAS</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['S', 'M', 'L', 'XL'].map(t => {
                  const currentParams = new URLSearchParams(Object.entries(resolvedParams).reduce((acc, [k, v]) => {
                    if (v) acc[k] = v;
                    return acc;
                  }, {} as Record<string, string>));
                  currentParams.set('talla', t);

                  return (
                    <Link key={t} href={`/catalogo?${currentParams.toString()}`} style={{
                      padding: '0.5rem 0.8rem',
                      border: talla === t ? '2px solid var(--unifor-blue)' : '1px solid var(--border)',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: talla === t ? 'var(--unifor-blue)' : 'inherit',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}>
                      {t}
                    </Link>
                  );
                })}
                {talla && (
                  <Link href="/catalogo" style={{fontSize: '0.8rem', color: 'red', textDecoration: 'none', marginTop: '0.5rem'}}>
                    Quitar Talla
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
              {categoria ? `Catálogo de ${categoria}` : 'Catálogo Completo'} 
              <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '1rem' }}>({filteredProducts.length} productos)</span>
            </h1>

            {filteredProducts.length > 0 ? (
              <div className={styles.productGrid}>
                {filteredProducts.map(product => {
                  const colors = JSON.parse(product.colors || '[]');
                  return (
                    <ProductCard 
                      key={product.id}
                      id={product.id}
                      name={product.name} 
                      category={product.category} 
                      imageSrc={product.imageSrc} 
                      colors={colors} 
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 0', background: 'var(--surface)', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No se encontraron productos con estos filtros.</h3>
                <Link href="/catalogo" style={{ color: 'var(--unifor-blue)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
                  Limpiar Filtros
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
