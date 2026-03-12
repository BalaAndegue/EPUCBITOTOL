import { Calendar, Megaphone, MessageSquare, Users, Mail, Video } from 'lucide-react';
import { getAdminStats } from '@/app/actions/admin';
import Link from 'next/link';

export default async function AdminDashboard() {
    const statsRes = await getAdminStats();

    if (!statsRes.success || !statsRes.data) {
        return <div className="p-4 text-red-500">Erreur de chargement des statistiques.</div>;
    }

    const stats = statsRes.data;

    const statCards = [
        { name: 'Annonces', value: stats.announcements, icon: Megaphone, href: '/fr/admin/announcements', color: 'bg-blue-500' },
        { name: 'Prédications', value: stats.sermons, icon: Video, href: '/fr/admin/messages', color: 'bg-red-500' },
        { name: 'Événements', value: stats.events, icon: Calendar, href: '/fr/admin/events', color: 'bg-green-500' },
        { name: 'Départements', value: stats.departments, icon: Users, href: '/fr/admin/departments', color: 'bg-purple-500' },
        {
            name: 'Témoignages',
            value: stats.testimonials.total,
            subValue: `${stats.testimonials.pending} en attente`,
            icon: MessageSquare,
            href: '/fr/admin/testimonials',
            color: 'bg-orange-500'
        },
        { name: 'Newsletter', value: stats.subscribers, icon: Mail, href: '/fr/admin/newsletter', color: 'bg-indigo-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link key={card.name} href={card.href} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group">
                            <div className="flex items-center justify-between pointer-events-none">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">{card.name}</p>
                                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                                    {card.subValue && (
                                        <p className="text-xs font-semibold text-red-500 mt-1">{card.subValue}</p>
                                    )}
                                </div>
                                <div className={`p-3 rounded-lg ${card.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                                    <Icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-8 text-center">
                <h2 className="text-xl font-bold mb-2">Bienvenue dans l'espace d'administration</h2>
                <p className="text-gray-500">
                    Sélectionnez une catégorie dans le menu de gauche pour commencer à gérer le contenu de votre site.
                    Toute modification sera automatiquement répercutée sur la plateforme publique.
                </p>
            </div>
        </div>
    );
}
