"use client";

import React, { useState, useEffect } from 'react';
import LenisProvider from '@/components/layout/LenisProvider';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Deteksi tema sistem
    const detectTheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    // Deteksi tema saat pertama kali
    detectTheme();

    // Listen untuk perubahan tema sistem
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <LenisProvider>
      {children}
    </LenisProvider>
  );
};

export default ClientLayout;

