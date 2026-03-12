'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Lock } from 'lucide-react';
import { login } from '@/app/actions/auth';
import { toast } from 'sonner';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // We pass FormData to Server Action
        const res = await login(formData);

        if (res.success) {
            toast.success('Connexion réussie !');
            // Redirect to admin dashboard
            router.push('/fr/admin');
        } else {
            toast.error(res.error || 'Identifiants incorrects');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Espace d'Administration
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Réservé aux administrateurs EPUC Bitotol
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Identifiant
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {loading ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
