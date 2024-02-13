import { type Metadata } from 'next';
import Slide from '@/src/components/loja/slideBanner/Slides';
import styles from './page.module.css';
import SlideVantagens from '@/src/components/loja/slideVantagens/SlideVantagens';
import Categorias from '@/src/components/loja/categorias/Categorias';
import Section from '@/src/components/loja/sections/Section';
import SectionColecoes from '@/src/components/loja/colecoes/SectionColecoes';

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
  // openGraph: {
  //   title: 'Abayomi Make Beauty',
  //   description:
  //     'Aqui na Abayomi Make Beauty você encontra uma variedade enorme de produtos selecionados com a melhor qualidade do mercado',
  //   images:
  //     'https://i.pinimg.com/280x280_RS/20/bf/15/20bf15f77c6b9f85b6198a1538a683ca.jpg'
  // }
};

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Slide />
        <SlideVantagens />
        <Categorias />
        <Section nomeSessao="Novidades" IdSessao="teste" quantidadeItens={4} />
        <Section
          nomeSessao="Mais vendidos"
          IdSessao="teste"
          quantidadeItens={4}
        />
        <SectionColecoes />
      </main>
    </>
  );
}
