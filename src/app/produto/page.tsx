import { Titulo } from '@/src/components/textos/Titulo';
import styles from './Produto.module.css';
import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import FotosProduto from '@/src/components/paginaProduto/fotosProduto/FotosProduto';
import Interacoes from '@/src/components/paginaProduto/interacoesUser/Interacoes';

function produto() {
  return (
    <div className={styles.section_produtos}>
      <Breadcrumb />
      <Titulo titulo="Creme Hydra" />
      <Interacoes />
      <FotosProduto />
    </div>
  );
}

export default produto;
