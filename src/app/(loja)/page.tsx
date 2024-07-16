import { type Metadata } from 'next';
import styles from './page.module.css';
import SlideVantagens from '@/src/components/loja/slide-vantagens/SlideVantagens';

import ContainerSlideBanner from '@/src/components/loja/slide-banners-home/ContainerSlideBanner';

import { Suspense } from 'react';
import HomeFetchs from '@/src/components/loja/sections-home/Home-fetchs';
import LoadingBanners from '@/src/components/loja/slide-banners-home/LoadingBanners';
import LoadingCategories from './loading-categories';
// import SectionColecoes from '@/src/components/loja/colecoes/SectionColecoes';

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
  robots: "'index', 'follow'",
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
