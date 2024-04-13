import { type Metadata } from 'next';
import styles from './page.module.css';
import SlideVantagens from '@/src/components/loja/slide-vantagens/SlideVantagens';

import ContainerSlideBanner from '@/src/components/loja/slide-banners-home/ContainerSlideBanner';

import { Suspense } from 'react';
import HomeFetchs from '@/src/components/loja/sections-home/Home-fetchs';
import Loading from './loading';
import LoadingBanners from '@/src/components/loja/slide-banners-home/LoadingBanners';
// import SectionColecoes from '@/src/components/loja/colecoes/SectionColecoes';

export const metadata: Metadata = {
  title: 'Abayomi Make Beauty | Home',
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

  robots: "'index', 'follow'"
};

export default async function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<LoadingBanners />}>
        <ContainerSlideBanner />
      </Suspense>
      <Suspense>
        <SlideVantagens />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <HomeFetchs />
      </Suspense>
      {/* <SectionColecoes /> */}
    </main>
  );
}
