/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Limita os tamanhos gerados automaticamente → economia de cache
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [32, 64, 128, 256],
    
    // Tempo de cache em segundos (31 dias)
    minimumCacheTTL: 2678400,

    // Segurança e controle de arquivos SVG
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Permite imagens externas específicas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'teste-bucket-new.s3.sa-east-1.amazonaws.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'mayse-bucket-site.s3.sa-east-1.amazonaws.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'lojabless-bucket.s3.sa-east-1.amazonaws.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'www.melhorenvio.com.br',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'melhorenvio.com.br',
        port: ''
      }
    ],

    // Usa formatos modernos se disponíveis (como WebP)
    formats: ['image/webp']
  }
};

module.exports = nextConfig;
