import Slide from '../components/slideBanner/Slides';
import styles from './page.module.css';
import SlideVantagens from '../components/slideVantagens/SlideVantagens';
import Categorias from '../components/categorias/Categorias';
import Section from '../components/sections/Section';
import SectionColecoes from '../components/sections/SectionColecoes';

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
