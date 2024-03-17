import { type Metadata } from 'next';
import styles from './page.module.css';
import SlideVantagens from '@/src/components/loja/slide-vantagens/SlideVantagens';
import Categorias from '@/src/components/loja/categorias/Categorias';
import Section from '@/src/components/loja/sections-home/Section';
import ContainerSlideBanner from '@/src/components/loja/slide-banners-home/ContainerSlideBanner';
import {
  getAllActiveProducts,
  getAllCategories,
  getProductBySales
} from '@/src/shared/api/GETS';
import { Suspense } from 'react';
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
  const novidades = await getAllActiveProducts();
  const maisVendidos = await getProductBySales();
  const categorias = await getAllCategories();

  return (
    <>
      <main className={styles.main}>
        <ContainerSlideBanner />
        <Suspense>
          <SlideVantagens />
        </Suspense>
        <Suspense>
          <Categorias categorias={categorias} />
        </Suspense>
        <Suspense>
          <Section data={novidades} nomeSessao="Novidades" link={'novidades'} />
        </Suspense>
        <Suspense>
          <Section
            data={maisVendidos}
            nomeSessao="Mais vendidos"
            link={'mais-vendidos'}
          />
        </Suspense>
        {/* <SectionColecoes /> */}
      </main>
    </>
  );
}
