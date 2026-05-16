'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/app/actions/newsletter';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function NewsletterForm() {
    const t = useTranslations('Newsletter');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        const res = await subscribeNewsletter(new FormData(e.target as HTMLFormElement));

        if (res.success) {
            toast.success(t('success'));
            setEmail('');
        } else {
            toast.error(res.error || t('error'));
        }
        setLoading(false);
    };

    return (
        <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-white font-semibold mb-3 text-sm">{t('title')}</h4>
            <p className="text-xs text-slate-400 mb-4">{t('description')}</p>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('placeholder')}
                    required
                    disabled={loading}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] disabled:opacity-50 transition-colors"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
