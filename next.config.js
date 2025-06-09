/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    minimumCacheTTL: 2678400,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

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
    ]
  }
};

module.exports = nextConfig;
