'use client';

import { useState, useEffect } from 'react';
import { getAllTestimonialsAdmin } from '@/app/actions/testimonialsAdmin';
import { deleteTestimonial, approveTestimonial } from '@/app/actions/admin';
import { Trash2, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const res = await getAllTestimonialsAdmin();
        if (res.success && res.data) {
            setTestimonials(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;
        const res = await deleteTestimonial(id);
        if (res.success) {
            toast.success('Témoignage supprimé');
            loadData();
        } else {
            toast.error('Erreur lors de la suppression');
        }
    };

    const handleApprove = async (id: string) => {
        const res = await approveTestimonial(id);
        if (res.success) {
            toast.success('Témoignage approuvé et publié !');
            loadData();
        } else {
            toast.error('Erreur lors de l\'approbation');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Modération des Témoignages</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="min-w-full divide-y divide-gray-200">
                    <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="col-span-8">Contenu</div>
                        <div className="col-span-2">Statut</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">Chargement...</div>
                        ) : testimonials.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Aucun témoignage enregistré.</div>
                        ) : (
                            testimonials.map((testi) => (
                                <div key={testi.id} className={`px-6 py-4 grid grid-cols-12 gap-4 items-center transition-colors ${!testi.isApproved ? 'bg-orange-50 hover:bg-orange-100' : 'hover:bg-gray-50'}`}>
                                    <div className="col-span-8">
                                        <div className="font-medium text-gray-900 flex items-center">
                                            <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                                            {testi.name}
                                            {testi.role && <span className="text-xs text-gray-400 font-normal ml-2">({testi.role})</span>}
                                        </div>
                                        <div className="text-sm text-gray-700 mt-2 italic">"{testi.content}"</div>
                                        <div className="text-xs text-gray-400 mt-2">Soumis le {new Date(testi.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="col-span-2">
                                        {testi.isApproved ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <CheckCircle className="w-3 h-3 mr-1" /> Publié
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                                                <XCircle className="w-3 h-3 mr-1" /> En attente
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-right space-x-2 flex justify-end">
                                        {!testi.isApproved && (
                                            <button
                                                onClick={() => handleApprove(testi.id)}
                                                className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-md transition-colors border border-transparent hover:border-green-200"
                                                title="Approuver et publier"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(testi.id)}
                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200"
                                            title="Supprimer"
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
