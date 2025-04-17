import { type NextRequest, NextResponse } from 'next/server';
import verifyToken from './shared/functions/verify-token';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const admin = req.cookies.get('isAdmin')?.value === process.env.ADMIN_ID;

  const authenticated = token ? await verifyToken(token) : false;

  const HomeUrl = new URL('/', req.url);
  const urlLogin = new URL('/login', req.url);

  console.log(admin);

  if (authenticated) {
    if (
      req.nextUrl.pathname.includes('login') ||
      req.nextUrl.pathname.includes('registrar')
    ) {
      return NextResponse.redirect(HomeUrl);
    }
    if (req.nextUrl.pathname.includes('dashboard') && !admin) {
      return NextResponse.redirect(HomeUrl);
    }
    return NextResponse.next();
  }
  if (!authenticated) {
    if (
      req.nextUrl.pathname === '/favoritos' ||
      req.nextUrl.pathname.includes('minha-conta') ||
      req.nextUrl.pathname.includes('dashboard') ||
      req.nextUrl.pathname.includes('carrinho') ||
      req.nextUrl.pathname.includes('finalizar')
    ) {
      return NextResponse.redirect(urlLogin);
    }

    return NextResponse.next();
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/login(.*)',
    '/registrar(.*)',
    '/minha-conta(.*)',
    '/favoritos(.*)',
    '/dashboard(.*)',
    '/carrinho(.*)',
    '/finalizar(.*)'
  ]
};
