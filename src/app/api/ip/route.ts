import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  let ip: any = request.headers.get('x-forwarded-for');

  // Se não estiver disponível, tente o cabeçalho 'x-real-ip'
  if (!ip) {
    ip = request.headers.get('x-real-ip');
  }

  // Como fallback, use a propriedade 'request.ip' se disponível (isso pode variar dependendo da configuração)
  if (!ip) {
    ip = request.ip;
  }

  console.log(ip);
  return Response.json(ip);
}
