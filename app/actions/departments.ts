'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getDepartments() {
    try {
        const departments = await prisma.department.findMany({
            orderBy: { name: 'asc' },
        });
        return { success: true, data: departments };
    } catch (error) {
        console.error('Failed to fetch departments:', error);
        return { success: false, error: 'Failed to fetch departments' };
    }
}

export async function createDepartment(data: { name: string; description: string; leaderName?: string; coverImage?: string | null }) {
    try {
        const newDepartment = await prisma.department.create({
            data: {
                name: data.name,
                description: data.description,
                leader: data.leaderName,
                coverImage: data.coverImage ?? null,
            },
        });

        revalidatePath('/');
        return { success: true, data: newDepartment };
    } catch (error) {
        console.error('Failed to create department:', error);
        return { success: false, error: 'Failed to create department' };
    }
}

