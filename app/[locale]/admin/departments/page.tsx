'use client';

import { useState, useEffect } from 'react';
import { getDepartments, createDepartment } from '@/app/actions/departments';
import { deleteDepartment } from '@/app/actions/admin';
import { Trash2, Plus, Users as UsersIcon, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import ImageUploader from '@/components/ui/ImageUploader';

export default function AdminDepartments() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const res = await getDepartments();
        if (res.success && res.data) setDepartments(res.data);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleDelete = (id: string) => {
        toast('Supprimer ce département ?', {
            action: { label: 'Supprimer', onClick: async () => {
                const res = await deleteDepartment(id);
                if (res.success) { toast.success('Département supprimé'); loadData(); }
                else toast.error('Erreur lors de la suppression');
            }},
            cancel: { label: 'Annuler', onClick: () => {} },
        });
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const leaderName = formData.get('leaderName') as string;

        const res = await createDepartment({ name, description, leaderName, coverImage });
        if (res.success) {
            toast.success('Département créé avec succès');
            (e.target as HTMLFormElement).reset();
            setCoverImage(null);
            setShowForm(false);
            loadData();
        } else {
            toast.error('Erreur lors de la création');
        }
        setSubmitting(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Départements</h1>
                <button
                    onClick={() => { setShowForm(!showForm); setCoverImage(null); }}
                    className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Département
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold mb-6">Créer un Département</h2>
                    <form onSubmit={handleCreate} className="space-y-5">

                        {/* Image de couverture */}
                        <ImageUploader
                            value={coverImage ?? undefined}
                            onChange={(url) => setCoverImage(url)}
                            label="Photo de couverture (optionnel)"
                            hint="Image représentant le département — JPG, PNG, WebP, 5 Mo max"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom du département</label>
                            <input type="text" name="name" required placeholder="Ex: Chorale des Jeunes"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" required rows={3} placeholder="Mission et rôle..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom du Responsable (Optionnel)</label>
                            <input type="text" name="leaderName"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button type="button" onClick={() => { setShowForm(false); setCoverImage(null); }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                                Annuler
                            </button>
                            <button type="submit" disabled={submitting}
                                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] disabled:opacity-60 disabled:cursor-not-allowed">
                                {submitting ? 'Enregistrement…' : 'Enregistrer'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-1">Photo</div>
                    <div className="col-span-9">Détails</div>
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
                                {/* Thumbnail */}
                                <div className="col-span-1">
                                    {dept.coverImage ? (
                                        <img src={dept.coverImage} alt={dept.name}
                                            className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <ImageIcon className="w-4 h-4 text-gray-300" />
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-9">
                                    <div className="font-medium text-gray-900 flex items-center gap-2">
                                        <UsersIcon className="w-4 h-4 text-[var(--color-primary)]" />
                                        {dept.name}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate mt-0.5">{dept.description}</div>
                                    {dept.leader && (
                                        <div className="text-xs text-gray-400 mt-0.5">Responsable : {dept.leader}</div>
                                    )}
                                </div>
                                <div className="col-span-2 text-right">
                                    <button onClick={() => handleDelete(dept.id)}
                                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-md transition-colors"
                                        title="Supprimer">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
