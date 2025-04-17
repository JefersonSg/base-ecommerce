import styles from './page.module.css';
import SlideVantagens from '@/src/components/loja/slide-vantagens/SlideVantagens';

import ContainerSlideBanner from '@/src/components/loja/slide-banners-home/ContainerSlideBanner';

import { Suspense } from 'react';
import HomeFetchs from '@/src/components/loja/sections-home/Home-fetchs';
import LoadingBanners from '@/src/components/loja/slide-banners-home/LoadingBanners';
import LoadingCategories from './loading-categories';
import { type Metadata } from 'next';

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
