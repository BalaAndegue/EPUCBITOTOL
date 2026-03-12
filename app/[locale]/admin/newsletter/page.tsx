'use client';

import { useState, useEffect } from 'react';
import { getSubscribersAdmin, deleteSubscriber } from '@/app/actions/newsletter';
import { Trash2, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminNewsletter() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const res = await getSubscribersAdmin();
        if (res.success && res.data) {
            setSubscribers(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;
        const res = await deleteSubscriber(id);
        if (res.success) {
            toast.success('Abonné supprimé');
            loadData();
        } else {
            toast.error('Erreur lors de la suppression');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Abonnés Newsletter</h1>
                <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center shadow-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    {subscribers.length} Abonné(s)
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="min-w-full divide-y divide-gray-200">
                    <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="col-span-8">Email</div>
                        <div className="col-span-2">Date d'inscription</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">Chargement...</div>
                        ) : subscribers.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Aucun abonné pour le moment.</div>
                        ) : (
                            subscribers.map((subs) => (
                                <div key={subs.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                                    <div className="col-span-8">
                                        <div className="font-medium text-gray-900 flex items-center">
                                            {subs.email}
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-sm text-gray-500">
                                        {new Date(subs.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <button
                                            onClick={() => handleDelete(subs.id)}
                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-md transition-colors"
                                            title="Supprimer l'abonné"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
