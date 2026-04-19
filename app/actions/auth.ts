'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || process.env.SESSION_SECRET || 'secret-epuc-bitotol-2026-dev-only';
const encodedKey = new TextEncoder().encode(secretKey);

// En production, utiliser des variables d'environnement pour les credentials.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'epuc2026';

export async function login(data: FormData) {
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const expires = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 jours

        const session = await new SignJWT({ user: ADMIN_USERNAME, role: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('10d')
            .sign(encodedKey);

        cookies().set('epuc_session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expires,
            sameSite: 'lax',
            path: '/',
        });

        return { success: true };
    }

    return { success: false, error: 'Identifiants incorrects' };
}

export async function logout() {
    cookies().delete('epuc_session');
}

export async function verifySession(token: string | undefined = '') {
    try {
        if (!token) return false;
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ['HS256'],
        });
        return !!payload;
    } catch {
        return false;
    }
}
