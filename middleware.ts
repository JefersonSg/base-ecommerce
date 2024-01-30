import { type NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const verify = localStorage.getItem('token');
  const url = req.url;

  if (verify && url.includes('/login')) {
    return NextResponse.redirect('http://localhost:3000/');
  }
}
console.log('ok');
export const config = {
  matcher: '/login'
};
