import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware Edge-safe : vérification légère du cookie de session.
 * La vérification JWT complète se fait côté serveur dans les Server Actions.
 * Cela évite le warning CompressionStream (Node.js API) dans le Edge Runtime.
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Rediriger la racine "/" vers "/fr"
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/fr', request.url));
    }

    // Protéger TOUTES les routes /admin/* sauf /admin/login
    if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
        const sessionCookie = request.cookies.get('epuc_session')?.value;

        if (!sessionCookie) {
            const locale = pathname.split('/')[1] || 'fr';
            const loginUrl = new URL(`/${locale}/admin/login`, request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Vérification rapide : le cookie doit être un JWT valide (3 segments séparés par ".")
        // La vérification cryptographique complète se fait dans les Server Actions.
        const parts = sessionCookie.split('.');
        if (parts.length !== 3) {
            const locale = pathname.split('/')[1] || 'fr';
            const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
            response.cookies.delete('epuc_session');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.png|.*\\.ico|.*\\.svg|.*\\.webp).*)'],
};
