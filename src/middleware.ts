import { type NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  const signInURL = new URL('/', req.url);

  if (token) {
    if (
      req.nextUrl.pathname.includes('login') ||
      req.nextUrl.pathname.includes('registrar')
    ) {
      return NextResponse.redirect(signInURL);
    }
  }
  if (!token) {
    if (req.nextUrl.pathname === '/minha-conta') {
      return NextResponse.redirect(signInURL);
    }
  }
}
export const config = {
  matcher: ['/login/:path*', '/registrar/', '/minha-conta']
};
