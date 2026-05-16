'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Shield } from 'lucide-react';

export default function CookieBanner() {
  const t = useTranslations('Cookie');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('epuc_cookie_consent');
    if (!consent) {
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
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[100] animate-fade-in transition-all duration-500">
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 flex flex-col gap-3">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <Shield className="w-4 h-4 text-[var(--church-gold)] flex-shrink-0" />
          {t('title')}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{t('desc')}</p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={declineCookies}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {t('decline')}
          </button>
          <button
            onClick={acceptCookies}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white rounded-xl transition-colors"
            style={{ backgroundColor: 'var(--church-gold)' }}
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
