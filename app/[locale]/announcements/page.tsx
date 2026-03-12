'use client';

import { Bell, Calendar, Users, Star, Megaphone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { getAnnouncements } from '@/app/actions';
import { useParams } from 'next/navigation';

export default function Announcements() {
    const locale = useParams()?.locale || 'fr';
    const [announcementsData, setAnnouncementsData] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const res = await getAnnouncements();
            if (res.success && res.data) {
                setAnnouncementsData(res.data);
            }
        }
        load();
    }, []);

    return (
        <div className="pt-20 bg-[var(--color-background)] min-h-screen">

            {/* Header */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href={`/${locale}`} className="inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                            <Bell className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-primary)]">
                                Annonces & Événements
                            </h1>
                            <p className="text-[var(--color-text-secondary)]">Ne manquez rien de la vie de notre église.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* List */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    {announcementsData.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">Aucune annonce pour le moment.</div>
                    ) : (
                        announcementsData.map((item) => {
                            // On the backend we stored 'title', 'content', 'createdAt', 'isUrgent'
                            // We will map this to the UI
                            const Icon = item.isUrgent ? Megaphone : Bell;
                            const colorClass = item.isUrgent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';
                            const category = item.isUrgent ? 'Urgent' : 'Info';
                            return (
                                <div key={item.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                                    <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wider ${colorClass}`}>
                                        {category}
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{item.title}</h3>

                                            <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)] mb-4">
                                                <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full"><Calendar className="w-4 h-4 mr-2 opacity-70" /> {new Date(item.createdAt).toLocaleDateString('fr-FR')}</span>
                                            </div>

                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </section>

            {/* Subscribe */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-xl mx-auto px-4 text-center">
                    <h3 className="text-xl font-bold mb-4">Restez Informé</h3>
                    <p className="text-gray-500 mb-6">Recevez les annonces directement sur votre téléphone via WhatsApp.</p>
                    <button className="btn-cameroon w-full sm:w-auto">
                        Rejoindre le groupe WhatsApp
                    </button>
                </div>
            </section>

        </div>
    );
}
