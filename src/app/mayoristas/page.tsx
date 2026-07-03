'use client';

import Navbar from '@/components/Navbar';
import AnimatedSection from '@/components/AnimatedSection';
import PageHeader from '@/components/PageHeader';
import { useState } from 'react';

export default function MayoristasPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Armar el mensaje para WhatsApp
    const mensajeWA = `Hola UNIFOR, quisiera contactarme para compras por mayor.%0A%0A*Datos de Contacto:*%0A- Nombre: ${formData.nombre}%0A- Empresa/Emprendimiento: ${formData.empresa}%0A- Email: ${formData.email}%0A- Teléfono: ${formData.telefono}%0A%0A*Mensaje:*%0A${formData.mensaje}`;
    
    // Redirigir a WhatsApp
    window.open(`https://wa.me/56983748231?text=${mensajeWA}`, '_blank');
  };

  return (
    <>
      <Navbar />
      
      <PageHeader 
        title="Ventas al por Mayor" 
        subtitle="Únete a nuestra red de distribuidores. Ofrecemos precios especiales y trato preferencial para compras por volumen, colegios y empresas estampadoras." 
        imageSrc="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=2000" 
      />

      <main style={{ background: 'var(--surface)', minHeight: '50vh' }}>

        {/* Form Section */}
        <section style={{ padding: '6rem 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <AnimatedSection delay={0.2}>
              <div style={{ background: 'var(--background)', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                  Formulario de Contacto Mayorista
                </h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="nombre" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Nombre Completo *</label>
                      <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', width: '100%' }} 
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="empresa" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Empresa o Emprendimiento</label>
                      <input 
                        type="text" 
                        id="empresa" 
                        name="empresa" 
                        value={formData.empresa}
                        onChange={handleChange}
                        style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', width: '100%' }} 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Correo Electrónico *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', width: '100%' }} 
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label htmlFor="telefono" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Teléfono / Celular *</label>
                      <input 
                        type="tel" 
                        id="telefono" 
                        name="telefono" 
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', width: '100%' }} 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="mensaje" style={{ fontWeight: 600, fontSize: '0.9rem' }}>¿Qué productos te interesan? *</label>
                    <textarea 
                      id="mensaje" 
                      name="mensaje" 
                      rows={5}
                      required
                      value={formData.mensaje}
                      onChange={handleChange}
                      style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', width: '100%', resize: 'vertical' }} 
                    />
                  </div>

                  <button type="submit" style={{
                    background: '#25D366',
                    color: 'white',
                    padding: '1.2rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
                    transition: 'transform 0.2s'
                  }}>
                    Enviar a WhatsApp
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Serás redirigido a WhatsApp para enviarnos estos datos de forma rápida y segura.
                  </p>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
    </>
  );
}
