'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { BookOpen, Send, X, ChevronDown, Loader2, Sparkles } from 'lucide-react';

type Message = { role: 'user' | 'model'; text: string };

const GOLD = '#C9973A';
const GOLD_LIGHT = '#E8B84B';

export default function BibleAssistant({ locale }: { locale: string }) {
  const t = useTranslations('Bible');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opening
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/bible-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply || t('ai_error') }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: t('ai_error') }]);
    }
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const suggestions = locale === 'en'
    ? ['What does John 3:16 mean?', 'How to pray effectively?', 'What is the Holy Spirit?']
    : ['Que signifie Jean 3:16 ?', 'Comment prier efficacement ?', 'Qu\'est-ce que le Saint-Esprit ?'];

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 sm:right-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, #0D1425 0%, #1a2540 100%)`,
            border: `1.5px solid rgba(201,151,58,0.5)`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,151,58,0.15)`,
          }}
          aria-label={t('open_label')}
        >
          <BookOpen className="w-6 h-6" style={{ color: GOLD_LIGHT }} />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})` }}
          >
            <Sparkles className="w-2.5 h-2.5 text-[#1C1917]" />
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-4 right-4 sm:right-6 z-50 flex flex-col w-[calc(100vw-2rem)] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            maxHeight: '520px',
            background: '#0D1425',
            border: '1px solid rgba(201,151,58,0.25)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,151,58,0.10)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, rgba(201,151,58,0.18) 0%, rgba(201,151,58,0.08) 100%)`,
              borderBottom: '1px solid rgba(201,151,58,0.18)',
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})` }}
            >
              <BookOpen className="w-4 h-4 text-[#1C1917]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold leading-tight">{t('title')}</p>
              <p className="text-xs" style={{ color: `rgba(201,151,58,0.75)` }}>{t('subtitle')}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg transition-colors hover:bg-white/10 flex-shrink-0"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              aria-label={t('close')}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0 }}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(201,151,58,0.12)', border: '1px solid rgba(201,151,58,0.2)' }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <p className="text-white/80 text-sm font-medium mb-1">{t('empty_title')}</p>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{t('empty_desc')}</p>
                <div className="flex flex-col gap-2 w-full">
                  {suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); inputRef.current?.focus(); }}
                      className="text-left px-3 py-2 rounded-xl text-xs transition-all"
                      style={{
                        background: 'rgba(201,151,58,0.08)',
                        border: '1px solid rgba(201,151,58,0.18)',
                        color: 'rgba(201,151,58,0.85)',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                      style={
                        m.role === 'user'
                          ? { background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})`, color: '#1C1917', borderBottomRightRadius: 4 }
                          : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.88)', borderBottomLeftRadius: 4, border: '1px solid rgba(255,255,255,0.08)' }
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div
                      className="px-4 py-3 rounded-2xl flex items-center gap-2"
                      style={{ background: 'rgba(255,255,255,0.07)', borderBottomLeftRadius: 4 }}
                    >
                      <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: GOLD }} />
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{t('thinking')}</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div
            className="px-3 pb-3 pt-2 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t('placeholder')}
                className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40"
                style={{ background: `linear-gradient(135deg,${GOLD},${GOLD_LIGHT})` }}
                aria-label={t('send')}
              >
                <Send className="w-3.5 h-3.5 text-[#1C1917]" />
              </button>
            </div>
            <p className="text-center text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {t('powered_by')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
