import type { Metadata } from 'next';
import {
  typeFirst,
  typeFirstDashboard,
  paymentFont
} from '../shared/functions/fonts';
import './globals.css';
import './fonts.css';
import './colors.css';
import { GoogleTagManager } from '@next/third-parties/google';

import Providers from '@/src/shared/providers/providers';

export const metadata: Metadata = {
  title: 'Abayomi Make Beauty',
  description:
    'Aqui na Abayomi Make Beauty você encontra uma variedade enorme de produtos selecionados com a melhor qualidade do mercado',
  keywords: [
    'Abayomi Make Beauty',
    'Maquiagem',
    'Maquiagens de qualidade',
    'Make Beauty'
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
    url: 'https://basecommerce.vercel.app/',
    siteName: 'Abayomi Make Beauty',
    title: 'Abayomi Make Beauty',
    description:
      'Aqui na Abayomi Make Beauty você encontra uma variedade enorme de produtos selecionados com a melhor qualidade do mercado',
    images:
      'https://i.pinimg.com/280x280_RS/20/bf/15/20bf15f77c6b9f85b6198a1538a683ca.jpg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-NYKP51D935" />
      <body
        className={`${typeFirst.variable} ${typeFirstDashboard.variable} ${paymentFont.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
