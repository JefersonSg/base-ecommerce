import { Titulo } from '../textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';
import SlideSubcategorias from './slide/SlideSubcategorias';

function Produtos({ pesquisa }: { pesquisa?: string }) {
  return (
    <div className={styles.produtos_container}>
      <Titulo titulo={pesquisa ?? ''} />
      {!pesquisa && (
        <div className={styles.subcategorias}>
          <SlideSubcategorias />
        </div>
      )}
      <SectionProdutos pesquisa={pesquisa} />
    </div>
  );
}

export default Produtos;
