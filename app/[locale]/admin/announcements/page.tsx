'use client';

import { useState, useEffect } from 'react';
import { getAnnouncements, createAnnouncement } from '@/app/actions';
import { deleteAnnouncement } from '@/app/actions/admin';
import { Trash2, Plus, AlertCircle, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import ImageUploader from '@/components/ui/ImageUploader';

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const res = await getAnnouncements();
        if (res.success && res.data) setAnnouncements(res.data);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) return;
        const res = await deleteAnnouncement(id);
        if (res.success) { toast.success('Annonce supprimée'); loadData(); }
        else toast.error('Erreur lors de la suppression');
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const isUrgent = formData.get('isUrgent') === 'on';

        const res = await createAnnouncement({ title, content, isUrgent, coverImage });
        if (res.success) {
            toast.success('Annonce créée avec succès');
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Annonces</h1>
                <button
                    onClick={() => { setShowForm(!showForm); setCoverImage(null); }}
                    className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Annonce
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold mb-6">Créer une Annonce</h2>
                    <form onSubmit={handleCreate} className="space-y-5">

                        {/* Image de couverture */}
                        <ImageUploader
                            value={coverImage ?? undefined}
                            onChange={(url) => setCoverImage(url)}
                            label="Photo de couverture (optionnel)"
                            hint="Image illustrant l'annonce — JPG, PNG, WebP, 5 Mo max"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Titre</label>
                            <input type="text" name="title" required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contenu</label>
                            <textarea name="content" required rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="isUrgent" id="isUrgent"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="isUrgent" className="text-sm text-gray-900">
                                Marquer comme <span className="text-red-600 font-semibold">Urgent</span> (affiché en rouge)
                            </label>
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
                    <div className="col-span-7">Détails</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <div className="p-6 text-center text-gray-500">Chargement...</div>
                    ) : announcements.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">Aucune annonce trouvée.</div>
                    ) : (
                        announcements.map((ann) => (
                            <div key={ann.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                                {/* Thumbnail */}
                                <div className="col-span-1">
                                    {ann.coverImage ? (
                                        <img src={ann.coverImage} alt={ann.title}
                                            className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <ImageIcon className="w-4 h-4 text-gray-300" />
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-7">
                                    <div className="font-medium text-gray-900">{ann.title}</div>
                                    <div className="text-sm text-gray-500 truncate">{ann.content}</div>
                                </div>
                                <div className="col-span-2">
                                    {ann.isUrgent ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <AlertCircle className="w-3 h-3 mr-1" /> Urgent
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Info
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2 text-right">
                                    <button onClick={() => handleDelete(ann.id)}
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
