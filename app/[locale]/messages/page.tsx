import { prisma } from '@/lib/prisma';
import MessagesClient from '@/components/MessagesClient';
import { getTranslations } from 'next-intl/server';

const IMG = {
  hero: '/church-cover.webp',
};

export default async function Messages({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'fr';
  const t = await getTranslations({ locale, namespace: 'Messages' });

  let sermons: any[] = [];
  try {
    sermons = await prisma.sermon.findMany({ orderBy: { date: 'desc' } });
  } catch (err) {
    console.error('DB error (sermons):', err);
  }

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-56 sm:h-72 overflow-hidden">
        <img src={IMG.hero} alt={t('hero_alt')} className="img-section" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(7,10,20,.90) 0%, rgba(7,10,20,.45) 70%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 max-w-5xl mx-auto">
          <span className="badge-gold mb-3 inline-flex">{t('badge')}</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">
            {t('title')}
          </h1>
          <p className="text-white/70 mt-2 max-w-lg text-sm sm:text-base">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <MessagesClient initialSermons={sermons} locale={locale} />
    </div>
  );
}
