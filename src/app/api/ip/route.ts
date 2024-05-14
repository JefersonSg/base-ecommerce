import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  let ip: any = req.headers.get('x-forwarded-for')?.split(',').shift();

  if (!ip) {
    ip = req.headers.get('x-real-ip') ?? req.headers.get('cf-connecting-ip');
  }

  if (!ip) {
    ip = req.ip;
  }

  return NextResponse.json({ value: ip });
}
