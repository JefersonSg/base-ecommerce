import styles from './page.module.css';
import SlideVantagens from '@/src/components/loja/slide-vantagens/SlideVantagens';

import ContainerSlideBanner from '@/src/components/loja/slide-banners-home/ContainerSlideBanner';

import { Suspense } from 'react';
import HomeFetchs from '@/src/components/loja/sections-home/Home-fetchs';
import LoadingBanners from '@/src/components/loja/slide-banners-home/LoadingBanners';
import LoadingCategories from './loading-categories';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Loja Bless: SE VISTA DE SI. SE VISTA DE BLESS - Compre e Receba em Casa',
  description:
    'Desde 2017 vestindo mulheres clássicas e modernas, que gostam de se vestir bem, sem abrir mão do conforto!',
  icons: '/icone.svg',

  verification: {
    google: 'oZIkI3bhEnXdKiOZst7zIkgD4BW4RLVtYB8jS518PiE'
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  openGraph: {
    type: 'website',
    url: 'https://lojabless.vercel.app/',
    siteName: 'Loja Bless',
    title: 'Loja Bless: SE VISTA DE SI. SE VISTA DE BLESS',
    description:
      'Desde 2017 vestindo mulheres clássicas e modernas com estilo e conforto!',
    images: [
      {
        url: 'https://mayse-bucket-site.s3.sa-east-1.amazonaws.com/Banner+Loja+OpenGraphs.png',
        width: 1200,
        height: 630,
        alt: 'Capa do site da Loja Bless'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Loja Bless: SE VISTA DE SI. SE VISTA DE BLESS',
    description: 'Desde 2017 vestindo mulheres com estilo e conforto!',
    images: [
      'https://mayse-bucket-site.s3.sa-east-1.amazonaws.com/Banner+Loja+OpenGraphs.png'
    ]
  }
};

export default async function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingBanners />}>
        <ContainerSlideBanner />
        <SlideVantagens />
      </Suspense>
      <Suspense fallback={<LoadingCategories />}>
        <HomeFetchs />
      </Suspense>
      {/* <SectionColecoes /> */}
    </main>
  );
}
