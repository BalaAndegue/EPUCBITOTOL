'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Models imports not strictly required for basic fetches, but helpful if typing manually
// We rely on inferred types from PrismaClient

/**
 * Get all upcoming events
 */
export async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                date: 'asc',
            },
            take: 6,
        });
        return { success: true, data: events };
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return { success: false, error: 'Failed to fetch events' };
    }
}

/**
 * Get all approved testimonials
 */
export async function getTestimonials() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: {
                isApproved: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 6,
        });
        return { success: true, data: testimonials };
    } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        return { success: false, error: 'Failed to fetch testimonials' };
    }
}

/**
 * Submit a new testimonial
 */
export async function submitTestimonial(data: { name: string; comment: string; rating: number }) {
    try {
        const newTestimonial = await prisma.testimonial.create({
            data: {
                name: data.name,
                content: data.comment,
                rating: data.rating,
                // Auto-approve for demo purposes only! 
                // In a real app, this should be false and await admin approval.
                isApproved: true,
            },
        });

        // Revalidate the home page to show the new testimonial
        revalidatePath('/');
        revalidatePath('/[locale]', 'page');

        return { success: true, data: newTestimonial };
    } catch (error) {
        console.error('Failed to submit testimonial:', error);
        return { success: false, error: 'Failed to submit testimonial' };
    }
}

/**
 * Get all announcements
 */
export async function getAnnouncements() {
    try {
        const announcements = await prisma.announcement.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });
        return { success: true, data: announcements };
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        return { success: false, error: 'Failed to fetch announcements' };
    }
}

/**
 * Get all departments
 */
export async function getDepartments() {
    try {
        const departments = await prisma.department.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        return { success: true, data: departments };
    } catch (error) {
        console.error('Failed to fetch departments:', error);
        return { success: false, error: 'Failed to fetch departments' };
    }
}
/**
 * Get stats for the floating button
 * (Announcements of the week + Events of the month)
 */
export async function getFloatingButtonStats() {
    try {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        const recentAnnouncements = await prisma.announcement.count({
            where: {
                createdAt: {
                    gte: oneWeekAgo,
                },
            },
        });

        const upcomingEvents = await prisma.event.count({
            where: {
                date: {
                    gte: now,
                    lte: oneMonthFromNow,
                },
            },
        });

        return { success: true, data: { recentAnnouncements, upcomingEvents, total: recentAnnouncements + upcomingEvents } };
    } catch (error) {
        console.error('Failed to fetch floating button stats:', error);
        return { success: false, error: 'Failed to fetch stats' };
    }
}

/**
 * Create a new announcement (Admin)
 */
export async function createAnnouncement(data: { title: string; title_en?: string; content: string; content_en?: string; isUrgent: boolean; coverImage?: string | null }) {
    try {
        const newAnnouncement = await prisma.announcement.create({
            data: {
                title: data.title,
                title_en: data.title_en || null,
                content: data.content,
                content_en: data.content_en || null,
                isUrgent: data.isUrgent,
                coverImage: data.coverImage ?? null,
            },
        });

        revalidatePath('/');
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/announcements', 'page');
        revalidatePath('/[locale]/admin', 'page');

        return { success: true, data: newAnnouncement };
    } catch (error) {
        console.error('Failed to create announcement:', error);
        return { success: false, error: 'Failed to create announcement: ' + (error instanceof Error ? error.message : String(error)) };
    }
}

/**
 * Create a new event (Admin)
 */
export async function createEvent(data: { title: string; title_en?: string; description: string; description_en?: string; date: Date; time: string; location: string; coverImage?: string | null }) {
    try {
        const newEvent = await prisma.event.create({
            data: {
                title: data.title,
                title_en: data.title_en || null,
                description: data.description,
                description_en: data.description_en || null,
                date: data.date,
                time: data.time,
                location: data.location,
                coverImage: data.coverImage ?? null,
            },
        });

        revalidatePath('/');
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/admin', 'page');

        return { success: true, data: newEvent };
    } catch (error) {
        console.error('Failed to create event:', error);
        return { success: false, error: 'Failed to create event: ' + (error instanceof Error ? error.message : String(error)) };
    }
}
