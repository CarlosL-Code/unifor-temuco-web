import { prisma } from '@/lib/prisma';
import { addProduct, deleteProduct } from './actions';
import styles from './admin.module.css';

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Panel de Administración</h1>
      </header>
      
      <main className={styles.main}>
        <section className={styles.formSection}>
          <h2>Agregar Producto</h2>
          <form action={async (formData) => {
            'use server';
            await addProduct(formData);
          }} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Nombre del Producto</label>
              <input type="text" name="name" required placeholder="Ej: Polerón Canguro Básico" />
            </div>
            
            <div className={styles.inputGroup}>
              <label>Categoría</label>
              <select name="category" required>
                <option value="Polerones">Polerones</option>
                <option value="Poleras">Poleras</option>
                <option value="Buzos">Buzos</option>
                <option value="Conjuntos">Conjuntos</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
            
            <div className={styles.inputGroup}>
              <label>Imagen del Producto</label>
              <input type="file" name="image" accept="image/*" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Colores Disponibles (Hexadecimales, separados por coma)</label>
              <input type="text" name="colors" required placeholder="#FF0000, #00FF00, #000000" />
            </div>

            <button type="submit" className={styles.submitBtn}>Guardar Producto</button>
          </form>
        </section>

        <section className={styles.listSection}>
          <h2>Catálogo Actual</h2>
          <div className={styles.productList}>
            {products.map(product => {
              const colors = JSON.parse(product.colors);
              return (
                <div key={product.id} className={styles.productItem}>
                  <img src={product.imageSrc} alt={product.name} className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <div className={styles.colorsPreview}>
                      {colors.map((c: string, i: number) => (
                        <span key={i} className={styles.colorDot} style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <form action={async () => {
                    'use server';
                    await deleteProduct(product.id);
                  }}>
                    <button type="submit" className={styles.deleteBtn}>Eliminar</button>
                  </form>
                </div>
              );
            })}
            
            {products.length === 0 && <p>No hay productos registrados.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
