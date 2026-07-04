'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Credenciales inválidas');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className={styles.uLogo} style={{ 
            fontSize: '3rem', 
            background: 'linear-gradient(45deg, var(--unifor-blue), var(--unifor-yellow), var(--unifor-orange))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 900,
            display: 'block'
          }}>U</span>
          <h1 className={styles.title} style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            UNIFOR<sup style={{ fontSize: '0.4em', marginLeft: '2px' }}>®</sup> Admin
          </h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className={styles.btn}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
