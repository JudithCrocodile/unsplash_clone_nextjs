import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const notLoginRoutes = ['/login', '/join'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    if(token && token.value && notLoginRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    };

    return NextResponse.next();
}