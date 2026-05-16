'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X, Play, Calendar, BookOpen, Mic2, ChevronDown, ChevronUp, Info } from 'lucide-react';

type Sermon = {
  id: string;
  title: string;
  preacher: string;
  date: Date | string;
  verses?: string | null;
  description?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
};

function SermonCardExpanded({ msg, locale }: { msg: Sermon; locale?: string }) {
  const t = useTranslations('Messages');
  const [expanded, setExpanded] = useState(false);
  const hasMedia = !!(msg.videoUrl || msg.audioUrl);
  const hasLongDesc = (msg.description?.length ?? 0) > 120;
  const dateLocale = locale === 'en' ? 'en-GB' : 'fr-FR';

  return (
    <article
      className="card-soft overflow-hidden group transition-shadow hover:shadow-md cursor-pointer"
      onClick={() => setExpanded(prev => !prev)}
      role="button"
      aria-expanded={expanded}
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpanded(prev => !prev); }}
    >
      <div className="h-3 w-full" style={{ background: 'linear-gradient(90deg,var(--church-gold),var(--church-gold-light))' }} />

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--church-gold-bg)' }}>
            <BookOpen className="w-4 h-4" style={{ color: 'var(--church-gold)' }} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--church-gold)' }}>
            {t('sermon_label')}
          </span>
        </div>

        <h3 className="font-bold text-base leading-snug mb-1 group-hover:text-[var(--church-blue)] transition-colors"
          style={{ color: 'var(--church-text)' }}>
          {msg.title}
        </h3>

        {msg.verses && (
          <p className="text-xs italic mb-2" style={{ color: 'var(--church-gold)' }}>
            {msg.verses}
          </p>
        )}

        {msg.description && (
          <div className="mb-3">
            <p
              className="text-sm leading-relaxed"
              style={{
                color: 'var(--church-text-mid)',
                display: '-webkit-box',
                WebkitLineClamp: expanded ? undefined : 2,
                WebkitBoxOrient: 'vertical',
                overflow: expanded ? 'visible' : 'hidden',
              }}
            >
              {msg.description}
            </p>
            {hasLongDesc && (
              <button
                onClick={e => { e.stopPropagation(); setExpanded(prev => !prev); }}
                className="mt-1 text-xs font-semibold flex items-center gap-0.5 transition-colors"
                style={{ color: 'var(--church-blue)' }}
              >
                {expanded
                  ? <><ChevronUp className="w-3 h-3" />{t('show_less')}</>
                  : <><ChevronDown className="w-3 h-3" />{t('read_more')}</>
                }
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid var(--church-border-soft)' }}>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--church-text)' }}>
              {msg.preacher}
            </p>
            <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--church-text-soft)' }}>
              <Calendar className="w-3 h-3" />
              {new Date(msg.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            {hasMedia && (
              <a
                href={msg.videoUrl || msg.audioUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title={t('media_listen')}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ background: 'var(--church-blue)', color: 'white' }}
              >
                <Play className="w-4 h-4 fill-current" />
              </a>
            )}
            <button
              onClick={() => setExpanded(prev => !prev)}
              title={expanded ? t('collapse') : t('expand')}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'var(--church-gold-bg)', color: 'var(--church-gold)' }}
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MessagesClient({ initialSermons, locale }: { initialSermons: Sermon[]; locale?: string }) {
  const t = useTranslations('Messages');
  const [query, setQuery] = useState('');

  const filtered = query.trim().length === 0
    ? initialSermons
    : initialSermons.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.preacher.toLowerCase().includes(query.toLowerCase()) ||
        (s.verses || '').toLowerCase().includes(query.toLowerCase()) ||
        (s.description || '').toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
      {/* BARRE DE RECHERCHE */}
      <section className="py-8 sm:py-10" style={{ background: 'var(--church-navy)' }}>
        <div className="max-w-xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm text-white placeholder:text-white/35 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.12)',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,.12)' }}
                aria-label="Effacer"
              >
                <X className="w-3 h-3 text-white/60" />
              </button>
            )}
          </div>
          {query && (
            <p className="text-xs text-white/40 mt-2 pl-1">
              {t('search_results', { count: filtered.length })} {t('search_for')} &ldquo;{query}&rdquo;
            </p>
          )}
          <p className="text-xs mt-3 pl-1 flex items-center gap-1.5" style={{ color: 'rgba(201,151,58,0.65)' }}>
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            {t('info_tip')}
          </p>
        </div>
      </section>

      {/* LISTE PRÉDICATIONS */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center mx-auto"
                style={{ background: 'rgba(201,151,58,.10)', border: '1px solid rgba(201,151,58,.20)' }}>
                <Mic2 className="w-7 h-7" style={{ color: 'var(--church-gold)' }} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2" style={{ color: 'var(--church-text)' }}>
                {query ? t('no_results_title', { query }) : t('empty_title')}
              </h3>
              <p className="text-sm" style={{ color: 'var(--church-text-soft)' }}>
                {query ? t('no_results_hint') : t('empty_hint')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((msg) => (
                <SermonCardExpanded key={msg.id} msg={msg} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
