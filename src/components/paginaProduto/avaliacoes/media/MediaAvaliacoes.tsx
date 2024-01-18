import styles from './MediaAvaliacoes.module.css';
import Informacoes from './informacoes/Informacoes';
import Estatisticas from './estatisticas/Estatisticas';

function MediaAvaliacoes() {
  return (
    <div className={styles.mediaAvaliacoes}>
      <Informacoes />
      <Estatisticas />
    </div>
  );
}

export default MediaAvaliacoes;
