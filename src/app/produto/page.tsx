import { Titulo } from '@/src/components/textos/Titulo';
import styles from './Produto.module.css';
import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import FotosProduto from '@/src/components/pagina_produto/fotosProduto/FotosProduto';

function produto() {
  return (
    <div className={styles.section_produtos}>
      <Breadcrumb />
      <Titulo titulo="Creme Hydra" />
      <FotosProduto />
    </div>
  );
}

export default produto;
