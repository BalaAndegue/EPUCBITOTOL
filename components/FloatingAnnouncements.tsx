'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function FloatingAnnouncements({ locale }: { locale: string }) {
  const t        = useTranslations('Navigation');
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible]     = useState(false);
  const [count, setCount]         = useState(0);

  /* Don't show on the announcements page itself */
  const isOnAnnouncements = pathname.includes('/announcements');

  useEffect(() => {
    /* Slight delay so it slides in after page load */
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  /* Fetch count (non-blocking) */
  useEffect(() => {
    fetch(`/${locale === 'en' ? 'en' : 'fr'}/api/announcements-count`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.count) setCount(d.count); })
      .catch(() => {}); /* silent fail */
  }, [locale]);

  const label = t('announcements');
  const href  = `/${locale}/announcements`;

  if (isOnAnnouncements || dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      {/* Dismiss button (tiny) */}
      <button
        onClick={() => setDismissed(true)}
        className="w-6 h-6 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
        style={{ background: 'rgba(8,9,14,0.55)' }}
        aria-label="Fermer"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Main floating pill */}
      <Link
        href={href}
        className="group flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%)',
          color: '#0F1117',
          boxShadow: '0 6px 28px rgba(212,168,67,.45), 0 2px 8px rgba(0,0,0,.25)',
        }}
        aria-label={label}
      >
        <div className="relative">
          <Bell className="w-5 h-5 group-hover:animate-[wiggle_0.4s_ease-in-out]" />
          {count > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
              style={{ background: '#DC2626' }}
            >
              {count > 9 ? '9+' : count}
            </span>
          )}
        </div>
        <span className="hidden sm:inline">{label}</span>
      </Link>
    </div>
  );
}
