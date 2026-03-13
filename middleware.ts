import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const role = request.cookies.get('userRole')?.value;
    const { pathname } = request.nextUrl;
    const isAuthRoute = pathname.startsWith('/admin') ||
        pathname.startsWith('/student') ||
        pathname.startsWith('/lecturer');

    if (isAuthRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/student') && role !== 'STUDENT') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/lecturer') && role !== 'LECTURER') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (pathname === '/' && token && role) {
        return NextResponse.redirect(new URL(`/${role.toLowerCase()}/dashboard`, request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        '/admin/:path*',
        '/student/:path*',
        '/lecturer/:path*',
        '/'
    ],
}