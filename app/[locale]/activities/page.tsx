'use client';

import { useEffect, useState } from 'react';
import { Calendar, Music, BookOpen, Users, Clock, ArrowRight, Star, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { getDepartments } from '@/app/actions/departments';

const IMG = {
  hero:   '/church-2.webp',
  youth:  '/church-1.webp',
  choir:  '/church-3.webp',
  prayer: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200&auto=format&fit=crop',
  bible:  'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop',
};

const actIcons = [Star, BookOpen, Users];
const actColors = ['text-[var(--church-gold)]', 'text-blue-400', 'text-purple-400'];

export default function Activities() {
  const t = useTranslations('Activities');
  const locale = useParams()?.locale as string || 'fr';

  const activities = [
    { dayKey: 'a1_day', titleKey: 'a1_title', timeKey: 'a1_time', descKey: 'a1_desc' },
    { dayKey: 'a2_day', titleKey: 'a2_title', timeKey: 'a2_time', descKey: 'a2_desc' },
    { dayKey: 'a3_day', titleKey: 'a3_title', timeKey: 'a3_time', descKey: 'a3_desc' },
  ];

  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getDepartments();
      if (res.success && res.data) {
        setDepartments(res.data);
      }
    })();
  }, []);

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img src={IMG.hero} alt="" className="img-section"
          onError={(e) => { (e.target as HTMLImageElement).src = IMG.prayer; }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,20,.88) 0%, rgba(7,10,20,.45) 60%, rgba(7,10,20,.20) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 max-w-5xl mx-auto">
          <span className="badge-gold mb-3 inline-flex">{t('badge')}</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">{t('title')}</h1>
          <p className="text-white/65 mt-2 max-w-lg text-sm sm:text-base">{t('subtitle')}</p>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          {activities.map((a, i) => {
            const Icon = actIcons[i];
            return (
              <div key={a.dayKey} className="card-soft overflow-hidden flex flex-col md:flex-row animate-fade-in"
                style={{ animationDelay: `${i * .1}s` }}>
                {/* Jour */}
                <div className="md:w-24 flex-shrink-0 flex flex-row md:flex-col items-center justify-center px-5 py-4 md:py-6 gap-3 md:gap-2"
                  style={{ background: 'var(--church-navy)' }}>
                  <Icon className={`w-6 h-6 ${actColors[i]}`} />
                  <span className={`font-bold text-sm uppercase tracking-wide ${actColors[i]}`}>
                    {t(a.dayKey as any).substring(0, 3)}
                  </span>
                </div>
                {/* Contenu */}
                <div className="flex-1 px-6 py-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-bold text-[var(--church-text)] text-lg">{t(a.titleKey as any)}</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--church-text-soft)] bg-[var(--church-border-soft)] px-3 py-1.5 rounded-full w-fit">
                      <Clock className="w-3.5 h-3.5" />
                      {t(a.timeKey as any)}
                    </span>
                  </div>
                  <p className="text-[var(--church-text-mid)] text-sm leading-relaxed">{t(a.descKey as any)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* GROUPES / DÉPARTEMENTS */}
      <section className="py-16 sm:py-20 dark-bg" style={{ background: 'var(--church-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-10 text-center">
            {t('groups_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {departments.length === 0 ? (
              <div className="col-span-2 text-center text-white/50 py-10">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>Aucun département pour le moment.</p>
              </div>
            ) : departments.map((d) => (
              <div key={d.id} className="relative overflow-hidden rounded-2xl aspect-video group">
                <img src={d.coverImage || IMG.youth} alt={d.name} className="img-section transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = IMG.bible; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                  {d.leader && (
                    <div className="flex items-center gap-2 text-[var(--church-gold)] text-xs font-semibold mb-2">
                      <UserCircle className="w-4 h-4" />
                      Responsable : {d.leader}
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-1">{d.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-sm line-clamp-2">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden dark-bg">
        <div className="absolute inset-0">
          <img src={IMG.bible} alt="" className="img-section"
            onError={(e) => { (e.target as HTMLImageElement).src = IMG.prayer; }} />
          <div className="absolute inset-0" style={{ background: 'rgba(7,10,20,.87)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">{t('cta_title')}</h2>
          <p className="text-white/70 mb-8 text-sm sm:text-base">{t('cta_desc')}</p>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {t('cta_btn')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
