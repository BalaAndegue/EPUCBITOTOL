import { Search, Mic2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import MessagesClient from '@/components/MessagesClient';

const IMG = {
  hero: '/church-cover.webp',
};

export default async function Messages() {
  let sermons: any[] = [];

  try {
    sermons = await prisma.sermon.findMany({
      orderBy: { date: 'desc' },
    });
  } catch (err) {
    console.error('DB error (sermons):', err);
  }

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-56 sm:h-72 overflow-hidden">
        <img src={IMG.hero} alt="Prédications" className="img-section" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(7,10,20,.90) 0%, rgba(7,10,20,.45) 70%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-8 max-w-5xl mx-auto">
          <span className="badge-gold mb-3 inline-flex">Messages & Sermons</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white">
            Nos Prédications
          </h1>
          <p className="text-white/65 mt-2 max-w-lg text-sm sm:text-base">
            Réécoutez les messages qui ont béni notre assemblée à Nkoabang.
          </p>
        </div>
      </section>

      {/* Composant client : recherche + liste */}
      <MessagesClient initialSermons={sermons} />

    </div>
  );
}
