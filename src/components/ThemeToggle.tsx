'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.placeholder} />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      className={styles.toggle}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle Theme"
      title="Cambiar tema oscuro/claro"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
