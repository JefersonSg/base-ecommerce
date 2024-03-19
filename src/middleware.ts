import { type NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const admin = req.cookies.get('isAdmin')?.value;

  const signInURL = new URL('/', req.url);
  const urlLogin = new URL('/login', req.url);

  if (token) {
    if (
      req.nextUrl.pathname.includes('login') ||
      req.nextUrl.pathname.includes('registrar')
    ) {
      return NextResponse.redirect(signInURL);
    }
    if (req.nextUrl.pathname.includes('dashboard') && !admin) {
      return NextResponse.redirect(signInURL);
    }
    return NextResponse.next();
  }
  if (!token) {
    if (req.nextUrl.pathname === '/minha-conta') {
      return NextResponse.redirect(urlLogin);
    }
    if (req.nextUrl.pathname === '/favoritos') {
      return NextResponse.redirect(urlLogin);
    }
    if (req.nextUrl.pathname.includes('dashboard')) {
      return NextResponse.redirect(urlLogin);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/login/:path*',
    '/registrar/',
    '/minha-conta',
    '/favoritos',
    '/dashboard/:path*'
  ]
};
