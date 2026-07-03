import styles from './FeaturesStrip.module.css';

export default function FeaturesStrip() {
  const features = [
    {
      icon: "🚚",
      title: "Envío a Todo Chile",
      desc: "Despachos rápidos y seguros"
    },
    {
      icon: "⭐",
      title: "Calidad Premium",
      desc: "Algodón peinado de alta densidad"
    },
    {
      icon: "🏢",
      title: "Ventas Mayoristas",
      desc: "Precios especiales para empresas"
    },
    {
      icon: "🛡️",
      title: "Compra Segura",
      desc: "Garantía en todos nuestros productos"
    }
  ];

  return (
    <div className={styles.strip}>
      <div className={`container ${styles.grid}`}>
        {features.map((f, i) => (
          <div key={i} className={styles.feature}>
            <span className={styles.icon}>{f.icon}</span>
            <div className={styles.text}>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
