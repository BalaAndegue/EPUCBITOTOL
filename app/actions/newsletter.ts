'use server';

import { prisma } from '@/lib/prisma';
import { verifySession } from './auth';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Helper to ensure admin only
async function checkAdmin() {
    const token = cookies().get('epuc_session')?.value;
    const isValid = await verifySession(token);
    if (!isValid) throw new Error('Unauthorized');
}

/**
 * Subscribe an email to the newsletter
 */
export async function subscribeNewsletter(data: FormData) {
    try {
        const email = data.get('email') as string;

        if (!email || !email.includes('@')) {
            return { success: false, error: 'Email invalide' };
        }

        const existing = await prisma.subscriber.findUnique({
            where: { email }
        });

        if (existing) {
            return { success: false, error: 'Vous êtes déjà inscrit à la newsletter !' };
        }

        await prisma.subscriber.create({
            data: { email }
        });

        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/admin/newsletter', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to subscribe:', error);
        return { success: false, error: 'Erreur lors de l\'inscription. Veuillez réessayer plus tard.' };
    }
}

/**
 * Get all subscribers (Admin only)
 */
export async function getSubscribersAdmin() {
    try {
        await checkAdmin();
        const subscribers = await prisma.subscriber.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { success: true, data: subscribers };
    } catch (error) {
        console.error('Failed to fetch subscribers:', error);
        return { success: false, error: 'Failed to fetch subscribers' };
    }
}

/**
 * Delete a subscriber (Admin only)
 */
export async function deleteSubscriber(id: string) {
    try {
        await checkAdmin();
        await prisma.subscriber.delete({ where: { id } });

        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/admin/newsletter', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete subscriber:', error);
        return { success: false, error: 'Failed to delete' };
    }
}
