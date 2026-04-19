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
 * Get all sermons (Public & Admin)
 */
export async function getSermons() {
    try {
        const sermons = await prisma.sermon.findMany({
            orderBy: { date: 'desc' },
        });
        return { success: true, data: sermons };
    } catch (error) {
        console.error('Failed to fetch sermons:', error);
        return { success: false, error: 'Failed to fetch sermons' };
    }
}

/**
 * Create a new Sermon (Admin only)
 */
export async function createSermon(data: { title: string; preacher: string; date: Date; description?: string; verses?: string; videoUrl?: string; audioUrl?: string }) {
    try {
        await checkAdmin();
        const newSermon = await prisma.sermon.create({
            data,
        });

        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/messages', 'page');
        revalidatePath('/[locale]/admin/messages', 'page');

        return { success: true, data: newSermon };
    } catch (error) {
        console.error('Failed to create sermon:', error);
        return { success: false, error: 'Failed to create sermon' };
    }
}

/**
 * Delete a Sermon (Admin only)
 */
export async function deleteSermon(id: string) {
    try {
        await checkAdmin();
        await prisma.sermon.delete({ where: { id } });

        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/messages', 'page');
        revalidatePath('/[locale]/admin/messages', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete sermon:', error);
        return { success: false, error: 'Failed to delete' };
    }
}
