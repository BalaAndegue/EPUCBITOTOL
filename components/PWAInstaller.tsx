'use client';

import { useEffect } from 'react';

export default function PWAInstaller() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('SW enregistré:', reg.scope))
          .catch((err) => console.warn('SW échec:', err));
      });
    }
  }, []);

  return null;
}
