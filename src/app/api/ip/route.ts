import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  let ip: any = req.headers.get('x-forwarded-for')?.split(',').shift();

  if (!ip) {
    ip = req.headers.get('x-real-ip') ?? req.headers.get('cf-connecting-ip');
  }

  if (!ip) {
    ip = req.ip;
  }

  const userAgent = req.headers.get('user-agent') ?? '';
  const isBot =
    /bot|crawl|spider|slurp|bing|baidu|yandex|duckduck|facebook|pinterest|embedly|quora|reddit|mediapartners|google/i.test(
      userAgent
    );

  return NextResponse.json({
    ip,
    localization: req.geo,
    isBot,
    userAgent
  });
}
