'use client';

import { useState } from 'react';
import { createAnnouncement, createEvent } from '@/app/actions';

export default function AdminDashboard() {
    const [announcementMsg, setAnnouncementMsg] = useState('');
    const [eventMsg, setEventMsg] = useState('');

    const handleAnnouncementSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const isUrgent = formData.get('isUrgent') === 'on';

        const res = await createAnnouncement({ title, content, isUrgent });
        if (res.success) {
            setAnnouncementMsg('✅ Annonce créée avec succès !');
            (e.target as HTMLFormElement).reset();
        } else {
            setAnnouncementMsg('❌ Erreur lors de la création.');
        }
    };

    const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = new Date(formData.get('date') as string);
        const time = formData.get('time') as string;
        const location = formData.get('location') as string;

        const res = await createEvent({ title, description, date, time, location });
        if (res.success) {
            setEventMsg('✅ Événement créé avec succès !');
            (e.target as HTMLFormElement).reset();
        } else {
            setEventMsg('❌ Erreur lors de la création de l\'événement.');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Nouvelle Annonce */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Publier une Annonce</h2>
                <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Titre</label>
                        <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contenu</label>
                        <textarea name="content" required rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"></textarea>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="isUrgent" id="isUrgent" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                        <label htmlFor="isUrgent" className="ml-2 block text-sm text-gray-900">
                            Marquer comme Urgent (Affiché en rouge)
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none">
                        Publier l'annonce
                    </button>
                    {announcementMsg && <p className="mt-2 text-sm font-medium">{announcementMsg}</p>}
                </form>
            </div>

            {/* Nouvel Événement */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Créer un Événement</h2>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Titre</label>
                        <input type="text" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" name="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Heure</label>
                            <input type="time" name="time" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lieu</label>
                        <input type="text" name="location" required defaultValue="Temple EPUC Bitotol" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none">
                        Enregistrer l'événement
                    </button>
                    {eventMsg && <p className="mt-2 text-sm font-medium">{eventMsg}</p>}
                </form>
            </div>

        </div>
    );
}
