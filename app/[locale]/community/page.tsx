'use client';

import { Users, Heart, Coffee, Baby, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

const IMG = {
  hero:      '/church-3.webp',
  worship:   'https://images.unsplash.com/photo-1566288623394-377af472d81b?q=80&w=1400&auto=format&fit=crop',
  community: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1400&auto=format&fit=crop',
};

const groupIcons = [Shield, Heart, Baby, Coffee];
const groupColors = [
  { c: 'text-blue-400',    bg: 'bg-blue-950/50',   border: 'border-blue-800/30'   },
  { c: 'text-pink-400',    bg: 'bg-pink-950/50',   border: 'border-pink-800/30'   },
  { c: 'text-yellow-400',  bg: 'bg-yellow-950/50', border: 'border-yellow-800/30' },
  { c: 'text-emerald-400', bg: 'bg-emerald-950/50',border: 'border-emerald-800/30'},
];

export default function Community() {
  const t = useTranslations('Community');

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img src={IMG.hero} alt="" className="img-section"
          onError={(e) => { (e.target as HTMLImageElement).src = IMG.worship; }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,20,.88) 0%, rgba(7,10,20,.40) 70%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 max-w-5xl mx-auto">
          <span className="badge-gold mb-3 inline-flex">{t('badge')}</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">{t('title')}</h1>
          <p className="text-white/65 mt-2 max-w-lg text-sm sm:text-base">{t('subtitle')}</p>
        </div>
      </section>

      {/* GROUPES — fond sombre image */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.worship} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.community; }} />
          <div className="absolute inset-0" style={{ background: 'rgba(7,10,20,.88)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(['g1', 'g2', 'g3', 'g4'] as const).map((k, i) => {
              const Icon = groupIcons[i];
              const col = groupColors[i];
              return (
                <div key={k} className={`card-glass border ${col.border} p-6 animate-fade-in`}
                  style={{ animationDelay: `${i * .12}s` }}>
                  <div className={`w-12 h-12 ${col.bg} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${col.c}`} />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{t(`${k}_title` as any)}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-5">{t(`${k}_desc` as any)}</p>
                  <button className={`text-xs font-semibold ${col.c} hover:underline transition-colors`}>
                    {t('join_btn')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERSET */}
      <section className="py-16 sm:py-24 dark-bg" style={{ background: 'var(--church-navy)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="divider-gold" />
          <blockquote className="font-display italic text-2xl sm:text-3xl text-white/90 leading-relaxed my-8">
            {t('verse')}
          </blockquote>
          <cite className="not-italic text-[var(--church-gold)] font-semibold text-sm">{t('verse_ref')}</cite>
          <div className="divider-gold mt-8" />
        </div>
      </section>

      {/* IMAGE communauté */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img src={IMG.community} alt="Communauté ÉPUC" className="img-section"
          onError={(e) => { (e.target as HTMLImageElement).src = IMG.worship; }} />
        <div className="absolute inset-0 bg-[var(--church-navy)]/25" />
      </section>
    </div>
  );
}
