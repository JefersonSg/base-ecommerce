import Estrelas from './Estrelas';
import styles from './Informacoes.module.css';

function Informacoes() {
  return (
    <div className={styles.informacoes}>
      <h2 className={styles.numeroMedio}>4.5</h2>
      <p className={styles.textoMedia}>baseado em 2 comentários</p>
      <Estrelas />
    </div>
  );
}

export default Informacoes;
