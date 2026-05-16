'use client';

import { useState, useEffect } from 'react';
import { getSermons, createSermon, deleteSermon } from '@/app/actions/sermons';
import { Trash2, Plus, Video, CalendarIcon, BookOpen, Link as LinkIcon, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMessages() {
    const [sermons, setSermons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Preview URL parsing state
    const [videoUrlInput, setVideoUrlInput] = useState('');

    const loadData = async () => {
        setLoading(true);
        const res = await getSermons();
        if (res.success && res.data) {
            setSermons(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = (id: string) => {
        toast('Supprimer cette prédication ?', {
            action: { label: 'Supprimer', onClick: async () => {
                const res = await deleteSermon(id);
                if (res.success) { toast.success('Prédication supprimée'); loadData(); }
                else toast.error('Erreur lors de la suppression');
            }},
            cancel: { label: 'Annuler', onClick: () => {} },
        });
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            title: formData.get('title') as string,
            preacher: formData.get('preacher') as string,
            date: new Date(formData.get('date') as string),
            description: formData.get('description') as string,
            verses: formData.get('verses') as string,
            videoUrl: formData.get('videoUrl') as string,
            downloadUrl: formData.get('downloadUrl') as string,
        };

        const res = await createSermon(data);
        if (res.success) {
            toast.success('Prédication ajoutée avec succès');
            (e.target as HTMLFormElement).reset();
            setVideoUrlInput('');
            setShowForm(false);
            loadData();
        } else {
            toast.error('Erreur lors de l\'ajout');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Prédications</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un Message
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Nouvelle Prédication</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Titre du message *</label>
                                <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Orateur / Prédicateur *</label>
                                <input type="text" name="preacher" required defaultValue="Pasteur " className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date de la prédication *</label>
                                <input type="date" name="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Versets de base (Ex: Jean 3:16)</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        <BookOpen className="w-4 h-4" />
                                    </span>
                                    <input type="text" name="verses" className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Résumé ou notes du message</label>
                            <textarea name="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"></textarea>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-4">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Multimédia (Optionnel)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lien Vidéo (YouTube ou Facebook)</label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-red-50 text-red-500 text-sm">
                                            <Video className="w-4 h-4" />
                                        </span>
                                        <input
                                            type="url"
                                            name="videoUrl"
                                            value={videoUrlInput}
                                            onChange={(e) => setVideoUrlInput(e.target.value)}
                                            placeholder="https://youtu.be/..."
                                            className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Copiez simplement le lien de la page de la vidéo.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lien de Téléchargement (Audio, PDF...)</label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-blue-50 text-blue-500 text-sm">
                                            <LinkIcon className="w-4 h-4" />
                                        </span>
                                        <input type="url" name="downloadUrl" placeholder="https://drive.google.com/..." className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Lien vers Google Drive, Dropbox, etc.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                                Annuler
                            </button>
                            <button type="submit" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)]">
                                Publier la Prédication
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="min-w-full divide-y divide-gray-200">
                    <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="col-span-8">Détails de la Prédication</div>
                        <div className="col-span-2">Média</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">Chargement...</div>
                        ) : sermons.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Aucune prédication enregistrée.</div>
                        ) : (
                            sermons.map((sermon) => (
                                <div key={sermon.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                                    <div className="col-span-8">
                                        <div className="font-bold text-gray-900 text-lg">{sermon.title}</div>
                                        <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                                            <span className="font-medium">Par {sermon.preacher}</span>
                                            <span className="flex items-center"><CalendarIcon className="w-3 h-3 mr-1" /> {new Date(sermon.date).toLocaleDateString()}</span>
                                            {sermon.verses && <span className="flex items-center text-[var(--color-primary)]"><BookOpen className="w-3 h-3 mr-1" /> {sermon.verses}</span>}
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex space-x-2">
                                        {sermon.videoUrl && (
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-red-50 text-red-600 text-xs font-medium" title="Vidéo jointe">
                                                <Video className="w-3 h-3 mr-1" /> Vidéo
                                            </span>
                                        )}
                                        {sermon.downloadUrl && (
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs font-medium" title="Fichier joint">
                                                <Download className="w-3 h-3 mr-1" /> Fichier
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-right flex justify-end">
                                        <button
                                            onClick={() => handleDelete(sermon.id)}
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
