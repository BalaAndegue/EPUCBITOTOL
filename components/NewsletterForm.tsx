'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/app/actions/newsletter';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        const res = await subscribeNewsletter(new FormData(e.target as HTMLFormElement));

        if (res.success) {
            setStatus('success');
            setMessage('Merci ! Vous êtes bien inscrit.');
            setEmail('');
        } else {
            setStatus('error');
            setMessage(res.error || 'Une erreur est survenue.');
        }
    };

    return (
        <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-white font-semibold mb-3 text-sm">Notre Newsletter</h4>
            <p className="text-xs text-slate-400 mb-4">
                Recevez nos enseignements et annonces importantes.
            </p>

            {status === 'success' ? (
                <div className="flex items-center text-green-400 text-sm bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{message}</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse e-mail"
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] disabled:opacity-50 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="absolute right-1 top-1 bottom-1 px-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            )}

            {status === 'error' && (
                <div className="mt-2 flex items-center text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
}
