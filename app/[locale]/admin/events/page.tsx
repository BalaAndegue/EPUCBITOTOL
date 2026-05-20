'use client';

import { useState, useEffect } from 'react';
import { getEvents, createEvent } from '@/app/actions';
import { deleteEvent } from '@/app/actions/admin';
import { Trash2, Plus, Calendar as CalendarIcon, MapPin, Clock, ImageIcon, Globe } from 'lucide-react';
import { toast } from 'sonner';
import ImageUploader from '@/components/ui/ImageUploader';
import LangTabs from '@/components/ui/LangTabs';

export default function AdminEvents() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const res = await getEvents();
        if (res.success && res.data) setEvents(res.data);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleDelete = (id: string) => {
        toast('Supprimer cet événement ?', {
            action: { label: 'Supprimer', onClick: async () => {
                const res = await deleteEvent(id);
                if (res.success) { toast.success('Événement supprimé'); loadData(); }
                else toast.error('Erreur lors de la suppression');
            }},
            cancel: { label: 'Annuler', onClick: () => {} },
        });
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const fd = new FormData(e.currentTarget);
        const res = await createEvent({
            title:          fd.get('title') as string,
            title_en:       fd.get('title_en') as string,
            description:    fd.get('description') as string,
            description_en: fd.get('description_en') as string,
            date:           new Date(fd.get('date') as string),
            time:           fd.get('time') as string,
            location:       fd.get('location') as string,
            coverImage,
        });
        if (res.success) {
            toast.success('Événement créé avec succès');
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Événements</h1>
                <button onClick={() => { setShowForm(!showForm); setCoverImage(null); }}
                    className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors">
                    <Plus className="w-4 h-4 mr-2" /> Nouvel Événement
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-xl font-bold">Créer un Événement</h2>
                        <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            <Globe className="w-3 h-3" /> Bilingue FR + EN
                        </span>
                    </div>

                    <form onSubmit={handleCreate} className="space-y-5">
                        <ImageUploader
                            value={coverImage ?? undefined}
                            onChange={(url) => setCoverImage(url)}
                            label="Photo de couverture (optionnel)"
                            hint="JPG, PNG, WebP — 5 Mo max"
                        />

                        <LangTabs>
                            {(lang) => (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Titre {lang === 'fr' ? <span className="text-red-500">*</span> : <span className="text-gray-400 text-xs">(optionnel)</span>}
                                        </label>
                                        <input type="text" name={lang === 'fr' ? 'title' : 'title_en'}
                                            required={lang === 'fr'}
                                            placeholder={lang === 'fr' ? 'Titre de l\'événement…' : 'Event title…'}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description {lang === 'fr' ? <span className="text-red-500">*</span> : <span className="text-gray-400 text-xs">(optionnel)</span>}
                                        </label>
                                        <textarea name={lang === 'fr' ? 'description' : 'description_en'}
                                            required={lang === 'fr'} rows={3}
                                            placeholder={lang === 'fr' ? 'Description de l\'événement…' : 'Event description…'}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                                    </div>
                                </div>
                            )}
                        </LangTabs>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date *</label>
                                <input type="date" name="date" required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Heure *</label>
                                <input type="time" name="time" required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Lieu *</label>
                            <input type="text" name="location" required defaultValue="Temple EPUC Nkoabang"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button type="button" onClick={() => { setShowForm(false); setCoverImage(null); }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Annuler</button>
                            <button type="submit" disabled={submitting}
                                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] disabled:opacity-60">
                                {submitting ? 'Enregistrement…' : 'Enregistrer'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-1">Photo</div>
                    <div className="col-span-5">Informations</div>
                    <div className="col-span-4">Détails pratiques</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="p-6 text-center text-gray-500">Chargement...</div>
                    ) : events.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">Aucun événement programmé.</div>
                    ) : events.map((evt) => (
                        <div key={evt.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                            <div className="col-span-1">
                                {evt.coverImage
                                    ? <img src={evt.coverImage} alt={evt.title} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                                    : <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-gray-300" /></div>
                                }
                            </div>
                            <div className="col-span-5">
                                <div className="font-medium text-gray-900">{evt.title}</div>
                                {evt.title_en && <div className="text-xs text-blue-500 mt-0.5">{evt.title_en}</div>}
                                <div className="text-sm text-gray-500 truncate">{evt.description}</div>
                            </div>
                            <div className="col-span-4 space-y-1">
                                <div className="flex items-center text-sm text-gray-700">
                                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                                    {new Date(evt.date).toLocaleDateString('fr-FR')}
                                    <Clock className="w-4 h-4 mx-2 text-gray-400" />
                                    {evt.time}
                                </div>
                                {evt.location && (
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        {evt.location}
                                    </div>
                                )}
                                {evt.title_en && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700"><Globe className="w-3 h-3 mr-1" />EN</span>}
                            </div>
                            <div className="col-span-2 text-right">
                                <button onClick={() => handleDelete(evt.id)}
                                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-md" title="Supprimer">
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
