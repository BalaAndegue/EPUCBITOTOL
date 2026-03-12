'use client';

import { Bell, Calendar, Users, Star, Megaphone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const announcements = [
    {
        category: 'Convention',
        title: 'Grande Convention Régionale 2024',
        date: '15 - 18 Août 2024',
        time: '09h00 - 20h00',
        location: 'Palais des Congrès, Yaoundé',
        description: 'Un rassemblement glorieux de toutes les églises EPUC du Centre. Orateurs internationaux, chorales régionales et miracles attendus.',
        color: 'bg-purple-100 text-purple-700',
        icon: Star
    },
    {
        category: 'Femmes',
        title: 'Conférence des Femmes de Destinée',
        date: 'Samedi 30 Mars 2024',
        time: '14h00',
        location: 'EPUC Bitotol, Temple',
        description: 'Thème: "La femme sage bâtit sa maison". Une après-midi d\'enseignement, d\'ateliers pratiques et de prière pour nos familles.',
        color: 'bg-pink-100 text-pink-700',
        icon: Users
    },
    {
        category: 'Jeunesse',
        title: 'J-FIRE Concert: Loud Praise',
        date: 'Vendredi 12 Avril 2024',
        time: '18h00',
        location: 'Esplanade du Temple',
        description: 'Une soirée de louange explosive avec la jeunesse. Invités surprises et évangélisation par la musique.',
        color: 'bg-yellow-100 text-yellow-700',
        icon: Megaphone
    },
    {
        category: 'Mission',
        title: 'Réception Missionnaire: Rev. Johnson',
        date: 'Dimanche 05 Mai 2024',
        time: '09h00',
        location: 'Culte Dominical',
        description: 'Nous aurons l\'honneur de recevoir le Révérend Johnson, missionnaire en Afrique de l\'Ouest. Venez écouter les témoignages du champ missionnaire.',
        color: 'bg-blue-100 text-blue-700',
        icon: Calendar
    }
];

export default function Announcements() {
    return (
        <div className="pt-20 bg-[var(--color-background)] min-h-screen">

            {/* Header */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] mb-6 transition-colors">
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
                    {announcements.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wider ${item.color}`}>
                                    {item.category}
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
                                            <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full"><Calendar className="w-4 h-4 mr-2 opacity-70" /> {item.date}</span>
                                            <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full"><Users className="w-4 h-4 mr-2 opacity-70" /> {item.location}</span>
                                        </div>

                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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
