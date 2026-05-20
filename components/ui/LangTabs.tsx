'use client';

import { useState } from 'react';

type Props = {
  children: (lang: 'fr' | 'en') => React.ReactNode;
  className?: string;
};

export default function LangTabs({ children, className = '' }: Props) {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

  return (
    <div className={className}>
      {/* Tab bar */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg w-fit"
        style={{ background: 'rgba(0,0,0,0.06)' }}>
        {(['fr', 'en'] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className="px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-150"
            style={
              lang === l
                ? { background: 'var(--color-primary, #C9973A)', color: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }
                : { color: '#6B7280' }
            }
          >
            {l === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
          </button>
        ))}
      </div>
      {children(lang)}
    </div>
  );
}
