import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import styles from './Produto.module.css';
import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import FotosProduto from '@/src/components/loja/paginaProduto/fotosProduto/FotosProduto';
import Interacoes from '@/src/components/loja/paginaProduto/interacoesUser/Interacoes';
import Detalhes from '@/src/components/loja/paginaProduto/produtoDetalhes/Detalhes';
import Sections from '@/src/components/loja/paginaProduto/sections/Sections';
import Avaliacoes from '@/src/components/loja/paginaProduto/avaliacoes/Avaliacoes';

function produto() {
  return (
    <div className={styles.section_produtos}>
      <Breadcrumb texto="Home / Mulher / Cremes / Creme Hydra" />
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
