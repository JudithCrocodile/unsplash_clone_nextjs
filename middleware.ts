import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const notLoginRoutes = ['/login', '/join'];

function decodeJwtPayload(token: string): { exp?: number } | null {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return null;
    }

    try {
        const payload = parts[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=');
        const decoded = atob(padded);
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

function isTokenInvalidOrExpired(token: string): boolean {
    const payload = decodeJwtPayload(token);
    if (!payload || typeof payload.exp !== 'number') {
        return true;
    }

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowInSeconds;
}

export function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('token');
    const tokenValue = tokenCookie?.value;

    if (tokenValue) {
        const isPlaceholder = tokenValue === 'undefined' || tokenValue === 'null';
        const isExpiredOrInvalid = !isPlaceholder && isTokenInvalidOrExpired(tokenValue);

        if (isPlaceholder || isExpiredOrInvalid) {
            const response = NextResponse.next();
            response.cookies.delete('token');
            return response;
        }
    }

    if(tokenValue && notLoginRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    };

    return NextResponse.next();
}