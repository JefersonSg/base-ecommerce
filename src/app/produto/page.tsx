import { Titulo } from '@/src/components/textos/Titulo';
import styles from './Produto.module.css';
import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import FotosProduto from '@/src/components/paginaProduto/fotosProduto/FotosProduto';
import Interacoes from '@/src/components/paginaProduto/interacoesUser/Interacoes';
import Detalhes from '@/src/components/paginaProduto/produtoDetalhes/Detalhes';
import Sections from '@/src/components/paginaProduto/sections/Sections';
import Avaliacoes from '@/src/components/paginaProduto/avaliacoes/Avaliacoes';

function produto() {
  return (
    <div className={styles.section_produtos}>
      <Breadcrumb />
      <Titulo titulo="Creme Hydra" />
      <Interacoes />
      <FotosProduto />
      <Detalhes />
      <Sections />
      <Avaliacoes />
    </div>
  );
}

export default produto;
