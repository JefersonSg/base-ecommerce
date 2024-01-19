import { Titulo } from '../textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';
import SlideSubcategorias from './slide/SlideSubcategorias';

function Produtos() {
  return (
    <div className={styles.produtos_container}>
      <Titulo titulo="" />
      <div className={styles.subcategorias}>
        <SlideSubcategorias />
      </div>
      <SectionProdutos />
    </div>
  );
}

export default Produtos;
