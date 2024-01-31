import Slide from '@/src/components/slideBanner/Slides';
import styles from './page.module.css';
import SlideVantagens from '@/src/components/slideVantagens/SlideVantagens';
import Categorias from '@/src/components/categorias/Categorias';
import Section from '@/src/components/sections/Section';
import SectionColecoes from '@/src/components/sections/SectionColecoes';

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
