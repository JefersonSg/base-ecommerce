import type { Metadata } from 'next';
import { typeFirst, typeFirstDashboard } from '../shared/functions/fonts';
import './globals.css';
import './fonts.css';
import './colors.css';
import { GoogleTagManager } from '@next/third-parties/google';

import Providers from '@/src/shared/providers/providers';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Loja Mayse: Moda intima & Sexy shop - Compre e Receba em Casa',
  description:
    'Bem-vindas à Loja Mayse, seu destino para moda íntima que realça sua feminilidade e desperta seus desejos. Oferecemos uma variedade de lingeries cuidadosamente selecionadas, além de produtos sensuais imperdíveis. Explore sua sensualidade na Loja Mayse.',
  keywords: [
    'Loja',
    'Mayse',
    'Loja Mayse',
    'sexy shop',
    'moda intima',
    'sexy shop',
    'lingerie',
    'calcinha',
    'sutiã',
    'conjuntos sexy',
    'loja de sexy shop barata'
  ],
  icons: '/icone.svg',
  verification: {
    google: 'oZIkI3bhEnXdKiOZst7zIkgD4BW4RLVtYB8jS518PiE'
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    url: 'https://lojamayse.com/',
    siteName: 'Loja Mayse: Moda intima & Sexy shop - Compre e Receba em Casa',
    title: 'Loja Mayse: Moda intima & Sexy shop - Compre e Receba em Casa',
    description:
      'Bem-vindas à Loja Mayse, seu destino para moda íntima que realça sua feminilidade e desperta seus desejos. Oferecemos uma variedade de lingeries cuidadosamente selecionadas, além de produtos sensuais imperdíveis. Explore sua sensualidade na Loja Mayse.',
    images: 'https://mayse-bucket-site.s3.sa-east-1.amazonaws.com/capaSite.jpg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Suspense>
        <GoogleTagManager gtmId="G-NYKP51D935" />
      </Suspense>
      <body className={`${typeFirst.variable} ${typeFirstDashboard.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
