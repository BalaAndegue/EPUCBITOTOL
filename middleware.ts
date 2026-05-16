import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localeDetection: false,
});

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

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
        const parts = sessionCookie.split('.');
        if (parts.length !== 3) {
            const locale = pathname.split('/')[1] || 'fr';
            const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
            response.cookies.delete('epuc_session');
            return response;
        }
    }

    // Déléguer à next-intl pour le contexte de locale (headers x-next-intl-locale)
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.png|.*\\.ico|.*\\.svg|.*\\.webp).*)'],
};
