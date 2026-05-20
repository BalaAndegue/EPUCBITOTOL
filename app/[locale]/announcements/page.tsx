'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Megaphone, ArrowLeft, Clock, AlertTriangle, Info } from 'lucide-react';
import { getAnnouncements } from '@/app/actions';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { pick } from '@/lib/i18n-pick';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1400&auto=format&fit=crop',
};

export default function Announcements() {
  const locale = (useParams()?.locale as string) || 'fr';
  const t = useTranslations('Announcements');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnouncements().then(res => {
      if (res.success && res.data) setItems(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-52 sm:h-64 overflow-hidden">
        <img src={IMG.hero} alt="" className="img-section" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,20,.92) 0%, rgba(7,10,20,.40) 70%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-7">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(201,151,58,0.18)', border: '1px solid rgba(201,151,58,0.3)' }}>
              <Bell className="w-5 h-5" style={{ color: '#C9973A' }} />
            </div>
            <span className="badge-gold">{t('badge')}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">{t('title')}</h1>
          <p className="text-white/65 text-sm mt-1">{t('subtitle')}</p>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <Link href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:text-[var(--church-gold)]"
            style={{ color: 'var(--church-text-soft)' }}>
            <ArrowLeft className="w-4 h-4" /> {t('back')}
          </Link>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="card-soft h-[450px] animate-pulse">
                  <div className="h-56 bg-gray-200 w-full" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="card-soft p-12 text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--church-cream-deep)' }}>
                <Bell className="w-7 h-7" style={{ color: 'var(--church-text-soft)' }} />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--church-text)' }}>
                {t('empty_title')}
              </h3>
              <p className="text-sm" style={{ color: 'var(--church-text-soft)' }}>
                {t('empty_desc')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <article key={item.id} className="card-soft overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500 h-full border-b-4 hover:border-b-[var(--church-gold)]">
                  {/* Image de Couverture en haut */}
                  {item.coverImage && (
                    <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                      {item.isUrgent && (
                        <div className="absolute top-4 right-4">
                          <span className="badge-red px-3 py-1 shadow-lg backdrop-blur-sm bg-red-600/90 text-white border-none">
                            {t('urgent')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6 sm:p-8 flex flex-col flex-1 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.isUrgent ? 'bg-red-50' : 'bg-green-50'}`}>
                        {item.isUrgent
                          ? <AlertTriangle className="w-5 h-5 text-red-600" />
                          : <Info className="w-5 h-5 text-green-600" />
                        }
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" style={{ color: 'var(--church-text-soft)' }} />
                        <span className="text-xs font-medium" style={{ color: 'var(--church-text-soft)' }}>
                          {new Date(item.createdAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-xl sm:text-2xl leading-tight mb-4 text-gray-900 group-hover:text-[var(--church-gold)] transition-colors">
                      {pick(item.title, item.title_en, locale)}
                    </h3>

                    <p className="text-sm sm:text-base leading-relaxed text-gray-600 flex-1 line-clamp-5">
                      {pick(item.content, item.content_en, locale)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CTA WhatsApp */}
          <div className="mt-10 rounded-2xl p-6 flex items-center gap-4 section-green">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.12)' }}>
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">{t('whatsapp_title')}</p>
              <p className="text-white/65 text-xs mt-0.5">{t('whatsapp_desc')}</p>
            </div>
            <a href="https://wa.me/+237699000000" target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
              {t('whatsapp_btn')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
