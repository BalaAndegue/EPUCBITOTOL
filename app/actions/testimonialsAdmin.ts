'use server';

import { prisma } from '@/lib/prisma';
import { verifySession } from './auth';
import { cookies } from 'next/headers';

// Helper to ensure admin only
async function checkAdmin() {
    const token = cookies().get('epuc_session')?.value;
    const isValid = await verifySession(token);
    if (!isValid) throw new Error('Unauthorized');
}

export async function getAllTestimonialsAdmin() {
    try {
        await checkAdmin();
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { success: true, data: testimonials };
    } catch (error) {
        console.error('Failed to fetch admin testimonials:', error);
        return { success: false, error: 'Failed to fetch testimonials' };
    }
}
