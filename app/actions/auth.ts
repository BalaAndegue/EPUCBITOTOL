'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET || 'secret-epuc-bitotol-2026-key-super-safe';
const encodedKey = new TextEncoder().encode(secretKey);

export async function login(data: FormData) {
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    // Extremely simple hardcoded credentials for demo/lightweight usage
    if (username === 'admin' && password === 'epuc2026') {
        const expires = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days

        // Create JWT Token
        const session = await new SignJWT({ user: 'admin', role: 'root' })
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
    } catch (error) {
        return false;
    }
}
