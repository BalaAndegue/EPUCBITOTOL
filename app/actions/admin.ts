'use server';

import { prisma } from '@/lib/prisma';
import { verifySession } from './auth';
import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Helper to ensure admin only
async function checkAdmin() {
    const token = cookies().get('epuc_session')?.value;
    const isValid = await verifySession(token);
    if (!isValid) throw new Error('Unauthorized');
}

/**
 * Get global statistics for the Admin Dashboard
 */
export async function getAdminStats() {
    try {
        await checkAdmin();

        const [eventsCount, announcementsCount, testimonialsTotal, testimonialsPending, departmentsCount, subscribersCount, sermonsCount] = await Promise.all([
            prisma.event.count(),
            prisma.announcement.count(),
            prisma.testimonial.count(),
            prisma.testimonial.count({ where: { isApproved: false } }),
            prisma.department.count(),
            prisma.subscriber.count(),
            prisma.sermon.count(),
        ]);

        return {
            success: true,
            data: {
                events: eventsCount,
                announcements: announcementsCount,
                testimonials: {
                    total: testimonialsTotal,
                    pending: testimonialsPending
                },
                departments: departmentsCount,
                subscribers: subscribersCount,
                sermons: sermonsCount,
            }
        };
    } catch (error) {
        console.error('Failed to get admin stats:', error);
        return { success: false, error: 'Unauthorized or failed to fetch stats' };
    }
}

/**
 * Delete an Announcement
 */
export async function deleteAnnouncement(id: string) {
    try {
        await checkAdmin();
        await prisma.announcement.delete({ where: { id } });

        revalidatePath('/');
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/announcements', 'page');
        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/admin/announcements', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete announcement:', error);
        return { success: false, error: 'Failed to delete' };
    }
}

/**
 * Delete an Event
 */
export async function deleteEvent(id: string) {
    try {
        await checkAdmin();
        await prisma.event.delete({ where: { id } });

        revalidatePath('/');
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/admin/events', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete event:', error);
        return { success: false, error: 'Failed to delete event' };
    }
}

/**
 * Delete a Department
 */
export async function deleteDepartment(id: string) {
    try {
        await checkAdmin();
        await prisma.department.delete({ where: { id } });

        revalidatePath('/');
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/admin/departments', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete department:', error);
        return { success: false, error: 'Failed to delete department' };
    }
}

/**
 * Delete a Testimonial
 */
export async function deleteTestimonial(id: string) {
    try {
        await checkAdmin();
        await prisma.testimonial.delete({ where: { id } });

        revalidatePath('/');
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/admin/testimonials', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete testimonial:', error);
        return { success: false, error: 'Failed to delete testimonial' };
    }
}

/**
 * Approve a Testimonial
 */
export async function approveTestimonial(id: string) {
    try {
        await checkAdmin();
        await prisma.testimonial.update({
            where: { id },
            data: { isApproved: true }
        });

        revalidatePath('/');
        revalidatePath('/[locale]', 'page');
        revalidatePath('/[locale]/admin', 'page');
        revalidatePath('/[locale]/admin/testimonials', 'page');

        return { success: true };
    } catch (error) {
        console.error('Failed to approve testimonial:', error);
        return { success: false, error: 'Failed to approve testimonial' };
    }
}
