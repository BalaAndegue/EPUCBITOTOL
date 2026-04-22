'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  useEffect(() => {
    // Vérifier si le consentement existe déjà
    const consent = localStorage.getItem('epuc_cookie_consent');
    if (!consent) {
      // Petit délai pour ne pas agresser l'utilisateur dès le chargement
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('epuc_cookie_consent', 'true');
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem('epuc_cookie_consent', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[100] animate-fade-in transition-all duration-500 transform translate-y-0">
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex flex-col gap-3">
        <h3 className="font-bold text-gray-900 text-base">
          {isEn ? "Respect for your privacy 🍪" : "Respect de votre vie privée 🍪"}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {isEn 
            ? "We use cookies to improve your experience, analyze our audience, and secure the platform."
            : "Nous utilisons des cookies pour améliorer votre expérience, analyser notre audience et sécuriser la plateforme."}
        </p>
        <div className="flex gap-3 mt-2">
          <button 
            onClick={declineCookies}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {isEn ? "Decline" : "Refuser"}
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-colors"
            style={{ backgroundColor: 'var(--church-gold)' }}
          >
            {isEn ? "Accept All" : "Tout Accepter"}
          </button>
        </div>
      </div>
    </div>
  );
}
