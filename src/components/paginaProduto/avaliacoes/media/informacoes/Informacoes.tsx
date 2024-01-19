import Estrelas from '../../Estrelas';
import styles from './Informacoes.module.css';

function Informacoes() {
  return (
    <div className={styles.informacoes}>
      <h2 className={styles.numero_media}>4.5</h2>
      <p className={styles.texto_media}>baseado em 2 comentários</p>
      <div className={styles.estrelas}>
        <Estrelas />
      </div>
    </div>
  );
}

export default Informacoes;
