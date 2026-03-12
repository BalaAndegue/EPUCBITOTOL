'use client';

import { useState, useEffect } from 'react';
import { getEvents, createEvent } from '@/app/actions';
import { deleteEvent } from '@/app/actions/admin';
import { Trash2, Plus, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminEvents() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const res = await getEvents();
        if (res.success && res.data) {
            setEvents(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;
        const res = await deleteEvent(id);
        if (res.success) {
            toast.success('Événement supprimé');
            loadData();
        } else {
            toast.error('Erreur lors de la suppression');
        }
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = new Date(formData.get('date') as string);
        const time = formData.get('time') as string;
        const location = formData.get('location') as string;

        const res = await createEvent({ title, description, date, time, location });
        if (res.success) {
            toast.success('Événement créé avec succès');
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Événements</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel Événement
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Créer un Événement</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Titre</label>
                            <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input type="date" name="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Heure</label>
                                <input type="time" name="time" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Lieu</label>
                            <input type="text" name="location" required defaultValue="Temple EPUC Bitotol" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-primary focus:border-primary" />
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
                        <div className="col-span-6">Informations</div>
                        <div className="col-span-4">Détails pratiques</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">Chargement...</div>
                        ) : events.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Aucun événement n'est programmé.</div>
                        ) : (
                            events.map((evt) => (
                                <div key={evt.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                                    <div className="col-span-6">
                                        <div className="font-medium text-gray-900">{evt.title}</div>
                                        <div className="text-sm text-gray-500 truncate">{evt.description}</div>
                                    </div>
                                    <div className="col-span-4 space-y-1">
                                        <div className="flex items-center text-sm text-gray-700">
                                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                                            {new Date(evt.date).toLocaleDateString()}
                                            <Clock className="w-4 h-4 mx-2 text-gray-400" />
                                            {evt.time}
                                        </div>
                                        {evt.location && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                {evt.location}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <button
                                            onClick={() => handleDelete(evt.id)}
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
