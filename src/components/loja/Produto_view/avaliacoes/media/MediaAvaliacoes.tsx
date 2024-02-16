import styles from './MediaAvaliacoes.module.css';
import Informacoes from './informacoes/Informacoes';
import Estatisticas from './estatisticas/Estatisticas';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

function MediaAvaliacoes({ data }: { data: ProductApi }) {
  return (
    <div className={styles.media_avaliacoes}>
      <Informacoes comments={data.comments} />
      <Estatisticas comments={data.comments} />
    </div>
  );
}

export default MediaAvaliacoes;
