'use client';

import { Heart, CreditCard, Smartphone, CheckCircle, Flame, HandHeart, Building2, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=1400&auto=format&fit=crop',
};

const paymentMethods = [
  {
    id: 'mtn',
    label: 'MTN Mobile Money',
    icon: Smartphone,
    color: '#FFCC00',
    textColor: '#1C1917',
    bg: 'bg-yellow-50',
    badgeKey: 'recommended',
    items: [
      { label: 'Numéro', value: '+237 6 70 00 00 00' },
      { label: 'Nom', value: 'ÉPUC Nkoabang' },
      { label: 'Code USSD', value: '*126*1*numéro*montant#' },
    ]
  },
  {
    id: 'orange',
    label: 'Orange Money',
    icon: Smartphone,
    color: '#FF6600',
    textColor: '#FFF',
    bg: 'bg-orange-50',
    badgeKey: null,
    items: [
      { label: 'Numéro', value: '+237 6 93 00 00 00' },
      { label: 'Nom', value: 'ÉPUC Nkoabang' },
      { label: 'Code USSD', value: '#150*numéro*montant#' },
    ]
  },
  {
    id: 'bank',
    label: 'Virement Bancaire',
    icon: CreditCard,
    color: '#1E3A8A',
    textColor: '#FFF',
    bg: 'bg-blue-50',
    badgeKey: null,
    items: [
      { label: 'Banque', value: 'UBA Cameroun' },
      { label: 'Compte', value: '00100333-06214 xxx' },
      { label: 'Swift', value: 'UNAFCMCX' },
    ]
  },
];

const impactIcons = [
  { icon: Flame,       color: 'text-orange-500',  bg: 'bg-orange-50',   tKey: 'impact_1' },
  { icon: Building2,   color: 'text-blue-600',    bg: 'bg-blue-50',     tKey: 'impact_2' },
  { icon: Users,       color: 'text-[#16803A]',   bg: 'bg-[#F0FDF4]',   tKey: 'impact_3' },
  { icon: HandHeart,   color: 'text-[#B91C1C]',   bg: 'bg-[#FFF1F2]',   tKey: 'impact_4' },
];

export default function Donate() {
  const t = useTranslations('Donate');

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img src={IMG.hero} alt="" className="img-section" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,20,.95) 0%, rgba(7,10,20,.50) 60%, rgba(7,10,20,.15) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)' }}>
            <Heart className="w-7 h-7 text-[#1C1917]" />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white mb-3">{t('title')}</h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base italic">
            &ldquo;{t('verse')}&rdquo;
            <span className="block mt-1 not-italic text-white/50 text-xs">{t('verse_ref')}</span>
          </p>
        </div>
      </section>

      {/* MÉTHODES DE PAIEMENT */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-gold mb-3 inline-flex">{t('badge')}</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold" style={{ color: 'var(--church-text)' }}>
              {t('methods_title')}
            </h2>
            <p className="text-sm mt-2" style={{ color: 'var(--church-text-soft)' }}>{t('methods_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {paymentMethods.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.id} className="card-soft overflow-hidden">
                  <div className="px-5 py-4 flex items-center justify-between"
                    style={{ background: m.color }}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" style={{ color: m.textColor }} />
                      <span className="font-bold text-sm" style={{ color: m.textColor }}>{m.label}</span>
                    </div>
                    {m.badgeKey && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20" style={{ color: m.textColor }}>
                        {t(m.badgeKey as any)}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    {m.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--church-text-soft)' }}>
                          {item.label}
                        </span>
                        <span className="text-sm font-mono font-bold text-right" style={{ color: 'var(--church-text)' }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 pb-5">
                    <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--church-cream-deep)' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--church-green-mid)' }} />
                      <p className="text-xs" style={{ color: 'var(--church-text-mid)' }}>
                        {t('confirm_text')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERSET */}
      <section className="py-10" style={{ background: 'var(--church-cream-deep)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="divider-gold" />
          <blockquote className="font-display italic text-lg sm:text-xl my-6 leading-relaxed"
            style={{ color: 'var(--church-text-mid)' }}>
            &ldquo;{t('verse')}&rdquo;
          </blockquote>
          <cite className="not-italic text-sm font-semibold" style={{ color: 'var(--church-gold)' }}>{t('verse_ref')}</cite>
          <div className="divider-gold mt-6" />
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-gold mb-3 inline-flex">{t('impact_badge')}</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold" style={{ color: 'var(--church-text)' }}>
              {t('impact_title')}
            </h2>
            <p className="text-sm mt-2" style={{ color: 'var(--church-text-soft)' }}>{t('impact_sub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactIcons.map(({ icon: Icon, color, bg, tKey }) => (
              <div key={tKey} className="card-soft p-5 text-center">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--church-text)' }}>
                  {t(`${tKey}_title` as any)}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--church-text-soft)' }}>
                  {t(`${tKey}_desc` as any)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
