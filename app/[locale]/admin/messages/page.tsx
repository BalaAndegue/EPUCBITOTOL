'use client';

import { useState, useEffect } from 'react';
import { getSermons, createSermon, deleteSermon } from '@/app/actions/sermons';
import { Trash2, Plus, Video, CalendarIcon, BookOpen, Link as LinkIcon, Globe } from 'lucide-react';
import { toast } from 'sonner';
import LangTabs from '@/components/ui/LangTabs';

export default function AdminMessages() {
    const [sermons, setSermons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [videoUrlInput, setVideoUrlInput] = useState('');

    const loadData = async () => {
        setLoading(true);
        const res = await getSermons();
        if (res.success && res.data) setSermons(res.data);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

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
        const fd = new FormData(e.currentTarget);
        const res = await createSermon({
            title:          fd.get('title') as string,
            title_en:       fd.get('title_en') as string,
            preacher:       fd.get('preacher') as string,
            date:           new Date(fd.get('date') as string),
            verses:         fd.get('verses') as string,
            verses_en:      fd.get('verses_en') as string,
            description:    fd.get('description') as string,
            description_en: fd.get('description_en') as string,
            videoUrl:       fd.get('videoUrl') as string,
            audioUrl:       fd.get('audioUrl') as string,
        });
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
                <button onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors">
                    <Plus className="w-4 h-4 mr-2" /> Ajouter un Message
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-bold">Nouvelle Prédication</h2>
                        <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            <Globe className="w-3 h-3" /> Bilingue FR + EN
                        </span>
                    </div>

                    <form onSubmit={handleCreate} className="space-y-4">
                        {/* Infos fixes (pas bilingues) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Orateur / Prédicateur *</label>
                                <input type="text" name="preacher" required defaultValue="Pasteur "
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date de la prédication *</label>
                                <input type="date" name="date" required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                            </div>
                        </div>

                        {/* Contenu bilingue */}
                        <LangTabs>
                            {(lang) => (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Titre {lang === 'fr' ? <span className="text-red-500">*</span> : <span className="text-gray-400 text-xs">(optionnel)</span>}
                                        </label>
                                        <input type="text" name={lang === 'fr' ? 'title' : 'title_en'}
                                            required={lang === 'fr'}
                                            placeholder={lang === 'fr' ? 'Titre de la prédication…' : 'Sermon title…'}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Versets <span className="text-gray-400 text-xs">(ex: Jean 3:16)</span>
                                        </label>
                                        <div className="flex mt-1">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                <BookOpen className="w-4 h-4" />
                                            </span>
                                            <input type="text" name={lang === 'fr' ? 'verses' : 'verses_en'}
                                                placeholder={lang === 'fr' ? 'Matthieu 28:19…' : 'Matthew 28:19…'}
                                                className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm p-2 border" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Résumé / Notes</label>
                                        <textarea name={lang === 'fr' ? 'description' : 'description_en'} rows={3}
                                            placeholder={lang === 'fr' ? 'Résumé du message…' : 'Sermon summary…'}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                                    </div>
                                </div>
                            )}
                        </LangTabs>

                        {/* Multimédia */}
                        <div className="border-t border-gray-100 pt-4">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Multimédia (Optionnel)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lien Vidéo (YouTube / Facebook)</label>
                                    <div className="flex mt-1">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-red-50 text-red-500">
                                            <Video className="w-4 h-4" />
                                        </span>
                                        <input type="url" name="videoUrl" value={videoUrlInput}
                                            onChange={e => setVideoUrlInput(e.target.value)}
                                            placeholder="https://youtu.be/..."
                                            className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm p-2 border" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lien Audio / Téléchargement</label>
                                    <div className="flex mt-1">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-blue-50 text-blue-500">
                                            <LinkIcon className="w-4 h-4" />
                                        </span>
                                        <input type="url" name="audioUrl" placeholder="https://drive.google.com/..."
                                            className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm p-2 border" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={() => setShowForm(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Annuler</button>
                            <button type="submit"
                                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)]">
                                Publier la Prédication
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-8">Détails de la Prédication</div>
                    <div className="col-span-2">Média</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="p-6 text-center text-gray-500">Chargement...</div>
                    ) : sermons.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">Aucune prédication enregistrée.</div>
                    ) : sermons.map((sermon) => (
                        <div key={sermon.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                            <div className="col-span-8">
                                <div className="font-bold text-gray-900">{sermon.title}</div>
                                {sermon.title_en && <div className="text-xs text-blue-500 mt-0.5">{sermon.title_en}</div>}
                                <div className="flex items-center text-sm text-gray-600 mt-1 gap-4">
                                    <span>Par {sermon.preacher}</span>
                                    <span className="flex items-center"><CalendarIcon className="w-3 h-3 mr-1" />{new Date(sermon.date).toLocaleDateString()}</span>
                                    {sermon.verses && <span className="flex items-center text-amber-600"><BookOpen className="w-3 h-3 mr-1" />{sermon.verses}</span>}
                                </div>
                            </div>
                            <div className="col-span-2 flex flex-col gap-1">
                                {sermon.videoUrl && <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-50 text-red-600 text-xs"><Video className="w-3 h-3 mr-1" />Vidéo</span>}
                                {sermon.title_en && <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs"><Globe className="w-3 h-3 mr-1" />EN</span>}
                            </div>
                            <div className="col-span-2 text-right">
                                <button onClick={() => handleDelete(sermon.id)}
                                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-md transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
