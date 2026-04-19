'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Download, ExternalLink, Globe, Smartphone, Wifi, BookMarked, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

/* Images contexte africain chrétien */
const IMG = {
  hero:   'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop',
  study1: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
  study2: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=600&auto=format&fit=crop',
  study3: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=600&auto=format&fit=crop',
  africa1: 'https://i.pinimg.com/736x/8b/2e/4f/8b2e4f5c1d3a7b9f2e4d6c8a1b3e5f7.jpg',
};

const bibles = [
  {
    id: 'lsg1910',
    version: 'Louis Segond 1910',
    lang: 'Français',
    flag: '🇫🇷',
    desc: 'La version classique, la plus utilisée dans les églises francophones d\'Afrique.',
    img: IMG.study1,
    color: '#1E3A8A',
    badge: 'Recommandée ÉPUC',
    readUrl: 'https://www.bible.com/fr/bible/93/GEN.1.LSG',
    downloadUrl: 'https://archive.org/download/lasaintebiblelou00sego/lasaintebiblelou00sego.pdf',
    appUrl: 'https://www.bible.com/app',
    formats: ['PDF', 'En ligne', 'Application'],
  },
  {
    id: 'nbs',
    version: 'Nouvelle Bible Segond (NBS)',
    lang: 'Français',
    flag: '🇫🇷',
    desc: 'Traduction moderne et fidèle, idéale pour la prédication et l\'étude contemporaine.',
    img: IMG.study2,
    color: '#065F46',
    badge: null,
    readUrl: 'https://www.bible.com/fr/bible/1312/GEN.1.NBS',
    downloadUrl: 'https://www.bible.com/app',
    appUrl: 'https://www.bible.com/app',
    formats: ['En ligne', 'Application'],
  },
  {
    id: 'bfc',
    version: 'Bible en Français Courant (BFC)',
    lang: 'Français',
    flag: '🇫🇷',
    desc: 'Langage simple et accessible, parfaite pour les nouveaux croyants et les jeunes.',
    img: IMG.study3,
    color: '#5B21B6',
    badge: 'Pour les jeunes',
    readUrl: 'https://www.bible.com/fr/bible/135/GEN.1.BFC',
    downloadUrl: 'https://www.bible.com/app',
    appUrl: 'https://www.bible.com/app',
    formats: ['En ligne', 'Application'],
  },
  {
    id: 'kjv',
    version: 'King James Version (KJV)',
    lang: 'English',
    flag: '🇬🇧',
    desc: 'The timeless English translation. Standard reference for English Bible study.',
    img: IMG.study1,
    color: '#92400E',
    badge: null,
    readUrl: 'https://www.bible.com/bible/1/GEN.1.KJV',
    downloadUrl: 'https://www.gutenberg.org/ebooks/10',
    appUrl: 'https://www.bible.com/app',
    formats: ['PDF', 'En ligne', 'Application'],
  },
  {
    id: 'darby',
    version: 'Darby Translation',
    lang: 'Français',
    flag: '🇫🇷',
    desc: 'Traduction littérale très appréciée pour l\'étude approfondie des Écritures.',
    img: IMG.study2,
    color: '#1F2937',
    badge: 'Étude approfondie',
    readUrl: 'https://www.bible.com/fr/bible/39/GEN.1.DARBY',
    downloadUrl: 'https://www.la-bible.net/bible/darby/',
    appUrl: 'https://www.bible.com/app',
    formats: ['En ligne'],
  },
  {
    id: 'osb',
    version: 'Ostervald Bible (OSB)',
    lang: 'Français',
    flag: '🇨🇭',
    desc: 'Révision Ostervald, version protestante historique très utilisée en Afrique francophone.',
    img: IMG.study3,
    color: '#7C2D12',
    badge: null,
    readUrl: 'https://www.bible.com/fr/bible/25/GEN.1.OSB',
    downloadUrl: 'https://www.bible.com/app',
    appUrl: 'https://www.bible.com/app',
    formats: ['En ligne', 'Application'],
  },
];

const apps = [
  { name: 'Bible.com (YouVersion)', desc: 'Plus de 2000 versions en 1200 langues. Lire, écouter, noter.', platform: 'Android & iOS', url: 'https://www.bible.com/app', color: '#10B981' },
  { name: 'Olive Tree Bible', desc: 'Application avancée pour l\'étude biblique approfondie.', platform: 'Android & iOS', url: 'https://www.olivetree.com/store/app/', color: '#059669' },
  { name: 'Bible Gateway', desc: 'Accès en ligne à des centaines de versions et langues.', platform: 'Web & App', url: 'https://www.biblegateway.com/', color: '#1E3A8A' },
  { name: 'La Bible en français', desc: 'Application spécialisée en versions françaises.', platform: 'Web', url: 'https://lire.la-bible.net/', color: '#7C3AED' },
];

export default function Bibles() {
  const t = useTranslations('Bibles');
  const [verse, setVerse] = useState<{ text: string; ref: string } | null>(null);

  useEffect(() => {
    fetch('/api/verse')
      .then(r => r.json())
      .then(d => { if (d.text) setVerse(d); })
      .catch(() => {});
  }, []);

  return (
    <div className="pt-20 min-h-screen" style={{ background: 'var(--church-cream)' }}>

      {/* HERO */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img src={IMG.hero} alt="Bible étude" className="img-section" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,10,20,.95) 0%, rgba(7,10,20,.45) 65%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <span className="badge-gold mb-3 inline-flex">{t('badge')}</span>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-white/65 text-sm sm:text-base max-w-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* VERSET DU JOUR */}
      {verse && (
        <section className="py-8" style={{ background: 'var(--church-navy)' }}>
          <div className="max-w-3xl mx-auto px-4 text-center dark-bg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Quote className="w-5 h-5" style={{ color: 'var(--church-gold)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--church-gold)' }}>
                Verset du jour
              </span>
            </div>
            <p className="font-display italic text-lg sm:text-xl text-white/90 leading-relaxed">&ldquo;{verse.text}&rdquo;</p>
            <cite className="block mt-3 text-sm not-italic font-semibold" style={{ color: 'var(--church-gold)' }}>{verse.ref}</cite>
          </div>
        </section>
      )}

      {/* BIBLES */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--church-text)' }}>
              Versions disponibles
            </h2>
            <p className="text-sm" style={{ color: 'var(--church-text-soft)' }}>
              Cliquez sur &ldquo;Lire en ligne&rdquo; pour accéder directement ou téléchargez le PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bibles.map((b) => (
              <div key={b.id} className="card-soft overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img src={b.img} alt={b.version} className="img-section" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(7,10,20,.85) 0%, transparent 60%)` }} />
                  <div className="absolute bottom-0 left-0 p-3 flex items-center gap-2">
                    <span className="text-lg">{b.flag}</span>
                    <span className="text-white/70 text-xs font-medium">{b.lang}</span>
                  </div>
                  {b.badge && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ background: b.color }}>
                      {b.badge}
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--church-text)' }}>{b.version}</h3>
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'var(--church-text-soft)' }}>{b.desc}</p>

                  {/* Formats */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {b.formats.map(f => (
                      <span key={f} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--church-cream-deep)', color: 'var(--church-text-mid)' }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-2">
                    <a href={b.readUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: b.color, color: 'white' }}>
                      <Globe className="w-3.5 h-3.5" />
                      Lire en ligne
                    </a>
                    <a href={b.downloadUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all"
                      style={{ background: 'var(--church-cream-deep)', color: 'var(--church-text)' }}>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS MOBILES */}
      <section className="py-12" style={{ background: 'var(--church-cream-deep)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smartphone className="w-5 h-5" style={{ color: 'var(--church-gold)' }} />
              <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: 'var(--church-text)' }}>
                Applications recommandées
              </h2>
            </div>
            <p className="text-sm" style={{ color: 'var(--church-text-soft)' }}>
              Pour lire la Bible sur votre téléphone, même sans connexion
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {apps.map((app) => (
              <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer"
                className="card-soft p-4 flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: app.color }}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm" style={{ color: 'var(--church-text)' }}>{app.name}</p>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-40 group-hover:opacity-70 transition-opacity" />
                  </div>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--church-text-soft)' }}>{app.desc}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Smartphone className="w-3 h-3" style={{ color: app.color }} />
                    <span className="text-[10px] font-medium" style={{ color: app.color }}>{app.platform}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HORS LIGNE */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-2xl p-6 flex items-start gap-4 dark-bg"
            style={{ background: 'linear-gradient(135deg, var(--church-navy), #162040)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,151,58,0.15)' }}>
              <Wifi className="w-6 h-6" style={{ color: '#C9973A' }} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1">Lire sans connexion Internet</p>
              <p className="text-white/65 text-xs leading-relaxed">
                Téléchargez l&apos;application <strong className="text-white/85">YouVersion Bible</strong> et
                téléchargez votre version préférée pour lire offline — très utile dans les zones à faible connexion du Cameroun.
              </p>
              <a href="https://www.bible.com/app" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                style={{ background: 'linear-gradient(135deg,#C9973A,#E8B84B)', color: '#1C1917' }}>
                <Download className="w-3.5 h-3.5" />
                Télécharger YouVersion
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
