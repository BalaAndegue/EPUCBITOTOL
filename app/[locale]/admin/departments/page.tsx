'use client';

import { useState, useEffect } from 'react';
import { getDepartments, createDepartment } from '@/app/actions/departments';
import { deleteDepartment } from '@/app/actions/admin';
import { Trash2, Plus, Users as UsersIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDepartments() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const res = await getDepartments();
        if (res.success && res.data) {
            setDepartments(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) return;
        const res = await deleteDepartment(id);
        if (res.success) {
            toast.success('Département supprimé');
            loadData();
        } else {
            toast.error('Erreur lors de la suppression');
        }
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const leaderName = formData.get('leaderName') as string;

        const res = await createDepartment({ name, description, leaderName });
        if (res.success) {
            toast.success('Département créé avec succès');
            (e.target as HTMLFormElement).reset();
            setShowForm(false);
            loadData();
        } else {
            toast.error('Erreur lors de la création');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Départements</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Département
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Créer un Département</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom du département</label>
                            <input type="text" name="name" required placeholder="Ex: Chorale des Jeunes" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" required rows={3} placeholder="Mission et rôle..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom du Responsable (Optionnel)</label>
                            <input type="text" name="leaderName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                                Annuler
                            </button>
                            <button type="submit" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)]">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="min-w-full divide-y divide-gray-200">
                    <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="col-span-10">Détails</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">Chargement...</div>
                        ) : departments.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Aucun département enregistré.</div>
                        ) : (
                            departments.map((dept) => (
                                <div key={dept.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                                    <div className="col-span-10">
                                        <div className="font-medium text-gray-900 flex items-center">
                                            <UsersIcon className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                                            {dept.name}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate mt-1">{dept.description}</div>
                                        {dept.leaderName && (
                                            <div className="text-xs text-gray-400 mt-1">Responsable: {dept.leaderName}</div>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <button
                                            onClick={() => handleDelete(dept.id)}
                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-md transition-colors"
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
