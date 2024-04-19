import type { Metadata } from 'next';
import { typeFirst, typeFirstDashboard } from '../shared/functions/fonts';
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';

import Providers from '@/src/shared/providers/providers';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Loja Mayse | Moda intima - Compre e Receba em Casa',
  description:
    'Bem-vindas à Loja Mayse, seu destino para moda íntima que realça sua feminilidade e desperta seus desejos. Oferecemos uma variedade de lingeries cuidadosamente selecionadas, além de produtos sensuais imperdíveis. Explore sua sensualidade na Loja Mayse.',
  keywords: [
    'Loja',
    'Mayse',
    'Loja Mayse',
    'sexy shop',
    'lingerie',
    'calcinha',
    'sutiã',
    'conjuntos sexy',
    'loja de sexy shop barata'
  ],
  icons:
    'https://i.pinimg.com/280x280_RS/20/bf/15/20bf15f77c6b9f85b6198a1538a683ca.jpg',
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
    siteName: 'Loja Mayse | Moda intima - Compre e Receba em Casa',
    title: 'Loja Mayse | Moda intima - Compre e Receba em Casa',
    description:
      'Bem-vindas à Loja Mayse, seu destino para moda íntima que realça sua feminilidade e desperta seus desejos. Oferecemos uma variedade de lingeries cuidadosamente selecionadas, além de produtos sensuais imperdíveis. Explore sua sensualidade na Loja Mayse.',
    images:
      'https://drive.google.com/uc?export=view&id=1RD-W1nNYdiYwvYj_4vdM3QE5Qf2Xe1t7'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${typeFirst.variable} ${typeFirstDashboard.variable}`}>
        <Providers>{children}</Providers>
      </body>
      <GoogleTagManager gtmId="G-NYKP51D935" />
    </html>
  );
}
