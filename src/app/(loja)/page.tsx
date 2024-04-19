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
  title: 'Loja Mayse | Home',
  description:
    'Bem-vindas à Loja Mayse, seu destino para moda íntima que realça sua feminilidade e desperta seus desejos. Oferecemos uma variedade de lingeries cuidadosamente selecionadas, além de produtos sensuais imperdíveis. Explore sua sensualidade na Loja Mayse.',
  keywords: [
    'Abayomi Make Beauty',
    'Maquiagem',
    'Maquiagens de qualidade',
    'Make Beauty'
  ],
  icons: '../../../public/icone.svg',

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
