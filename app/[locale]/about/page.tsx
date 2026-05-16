'use client';

import { Heart, Users, Target, Award, Sparkles, MapPin, BookOpen, Flame, Shield } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const IMG = {
  hero:    '/church-cover.webp',
  pray1:   'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1400&auto=format&fit=crop',
  bible:   'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop',
  worship: 'https://images.unsplash.com/photo-1566288623394-377af472d81b?q=80&w=1400&auto=format&fit=crop',
  team1:   '/church-1.webp',
  team2:   '/church-2.webp',
  team3:   '/church-3.webp',
};

const pillars = [
  { icon: Flame,    key: 'v1', c: 'text-orange-400',    bg: 'bg-orange-950/40'  },
  { icon: BookOpen, key: 'v2', c: 'text-blue-400',      bg: 'bg-blue-950/40'   },
  { icon: Sparkles, key: 'v3', c: 'text-purple-400',    bg: 'bg-purple-950/40' },
  { icon: Award,    key: 'v4', c: 'text-[#22C55E]',     bg: 'bg-green-950/40'  }, // Vert Espérance
  { icon: Target,   key: 'v5', c: 'text-[#F87171]',     bg: 'bg-red-950/40'    }, // Rouge Rédemption
  { icon: Users,    key: 'v6', c: 'text-[#4ADE80]',     bg: 'bg-green-950/30'  }, // Vert Vie
  { icon: Shield,   key: 'v7', c: 'text-indigo-400',    bg: 'bg-indigo-950/40' },
  { icon: Heart,    key: 'v8', c: 'text-[#FB7185]',     bg: 'bg-red-950/40'    }, // Rouge Amour
];

const milestoneKeys = ['t1', 't2', 't3', 't4', 't5'] as const;

export default function About() {
  const t = useTranslations('About');
  const locale = useParams()?.locale as string || 'fr';

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — Image plein écran
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <img src={IMG.hero} alt="ÉPUC Nkoabang" className="img-section"
          onError={(e) => { (e.target as HTMLImageElement).src = IMG.pray1; }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,20,.90) 0%, rgba(7,10,20,.50) 60%, rgba(7,10,20,.25) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl mx-auto">
          <span className="badge-gold mb-4 inline-flex">{t('badge')}</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight">
            {t('title')}
          </h1>
          <p className="text-white/70 text-base mt-3 max-w-xl">{t('subtitle')}</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VISION & MISSION — Split
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="space-y-6">
              <span className="badge-blue inline-flex">{t('vision_badge')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--church-text)] leading-tight">
                {t('vision_title_1')}<br />
                <span className="text-gradient-gold">{t('vision_title_2')}</span>
              </h2>
              <p className="text-[var(--church-text-mid)] text-base leading-relaxed">{t('vision_desc')}</p>

              <div className="verse-card">
                <p className="verse-text text-[var(--church-text-mid)] text-sm sm:text-base">{t('verse_text')}</p>
                <span className="block mt-2 text-[var(--church-gold)] text-xs font-semibold">{t('verse_ref')}</span>
              </div>

              <div className="grid gap-4">
                {(['mission', 'doctrine'] as const).map(k => (
                  <div key={k} className="card-soft p-5">
                    <h3 className="font-bold text-[var(--church-text)] mb-1.5 text-sm">{t(`${k}_title` as any)}</h3>
                    <p className="text-[var(--church-text-soft)] text-sm leading-relaxed">{t(`${k}_text` as any)}</p>
                  </div>
                ))}
                <div className="card-soft p-5" style={{ borderLeft: '4px solid var(--church-gold)' }}>
                  <h3 className="font-bold text-[var(--church-text)] mb-1.5 text-sm">{t('motto_title' as any)}</h3>
                  <p className="text-[var(--church-gold)] font-semibold text-base">{t('motto_text' as any)}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-50 hidden lg:block"
                style={{ background: 'linear-gradient(135deg, rgba(201,151,58,.08) 0%, transparent 60%)' }} />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
                <img src={IMG.pray1} alt="Assemblée en prière" className="img-section"
                  onError={(e) => { (e.target as HTMLImageElement).src = IMG.hero; }} />
                <div className="absolute inset-0 bg-[var(--church-navy)]/20" />
              </div>

              {/* Badge localisation */}
              <div className="absolute -bottom-5 -left-5 card-soft p-4 hidden sm:block max-w-xs">
                <div className="flex items-center gap-2 text-[var(--church-blue)] mb-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="font-bold text-xs">{t('location_card')}</span>
                </div>
                <p className="text-[var(--church-text-soft)] text-xs leading-relaxed whitespace-pre-line">
                  {t('location_card_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PILIERS DE FOI — Fond sombre + image worship
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 overflow-hidden dark-bg">
        <div className="absolute inset-0">
          <img src={IMG.worship} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.bible; }} />
          <div className="absolute inset-0" style={{ background: 'rgba(7,10,20,.90)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-gold mb-4 inline-flex">{t('pillars_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">{t('pillars_title')}</h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">{t('pillars_desc')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.key} className="card-glass p-5 animate-fade-in" style={{ animationDelay: `${i * .1}s` }}>
                  <div className={`w-10 h-10 ${p.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${p.c}`} />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2">{t(`${p.key}_title` as any)}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{t(`${p.key}_desc` as any)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVITEURS — Images réelles
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--church-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-gold mb-4 inline-flex">{t('team_badge')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--church-text)] mb-2">{t('team_title')}</h2>
            <p className="text-[var(--church-text-soft)] max-w-lg mx-auto text-sm">{t('team_desc')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { img: IMG.team1, nameKey: 'pastor1_name', roleKey: 'pastor1_role', descKey: 'pastor1_desc' },
              { img: IMG.team2, nameKey: 'pastor2_name', roleKey: 'pastor2_role', descKey: 'pastor2_desc' },
              { img: IMG.team3, nameKey: 'pastor3_name', roleKey: 'pastor3_role', descKey: 'pastor3_desc' },
            ].map((p) => (
              <div key={p.nameKey} className="card-soft overflow-hidden group">
                <div className="relative h-56 sm:h-64 overflow-hidden rounded-xl m-3">
                  <img src={p.img} alt={t(p.nameKey as any)} className="img-section transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = IMG.pray1; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--church-navy)]/60 via-transparent to-transparent" />
                </div>
                <div className="px-5 pb-6 text-center">
                  <h3 className="font-bold text-[var(--church-text)] mb-0.5">{t(p.nameKey as any)}</h3>
                  <p className="text-[var(--church-gold)] font-medium text-xs mb-3 uppercase tracking-wider">{t(p.roleKey as any)}</p>
                  <p className="text-[var(--church-text-soft)] text-sm leading-relaxed">{t(p.descKey as any)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24" style={{ background: 'var(--church-cream-deep)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="badge-gold mb-4 inline-flex">{t('timeline_badge')}</span>
            <h2 className="font-heading text-3xl font-bold text-[var(--church-text)]">{t('timeline_title')}</h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--church-gold)]/40 to-transparent" />
            <div className="space-y-6">
              {milestoneKeys.map((k, i) => (
                <div key={k} className="relative flex items-start gap-6 animate-fade-in" style={{ animationDelay: `${i * .12}s` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg flex-shrink-0 z-10"
                    style={{ background: 'linear-gradient(135deg,var(--church-gold),var(--church-gold-light))' }}>
                    {t(`${k}_year` as any).slice(2)}
                  </div>
                  <div className="card-soft p-4 flex-1">
                    <p className="text-[var(--church-gold)] font-bold text-sm mb-1">{t(`${k}_year` as any)}</p>
                    <p className="text-[var(--church-text-mid)] text-sm leading-relaxed">{t(`${k}_event` as any)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA FINAL — Image Bible
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden dark-bg">
        <div className="absolute inset-0">
          <img src={IMG.bible} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.hero; }} />
          <div className="absolute inset-0" style={{ background: 'rgba(7,10,20,.85)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">{t('cta_title')}</h2>
          <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">{t('cta_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`} className="btn-gold">{t('cta_contact')} <ArrowRight className="w-4 h-4" /></Link>
            <Link href={`/${locale}/activities`} className="btn-outline-white">{t('cta_activities')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
