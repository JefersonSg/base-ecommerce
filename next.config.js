/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
        hostname: 'testes-front-end.s3.sa-east-1.amazonaws.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'www.melhorenvio.com.br',
        port: ''
      }
    ]
  }
};

module.exports = nextConfig;
