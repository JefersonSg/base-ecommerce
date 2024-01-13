import styles from './interacoes.module.css';
import Estrelas from './Estrelas';
import Favotiro from './Favotiro';
import Compartilhar from './Compartilhar';

async function Interacoes() {
  return (
    <div className={styles.interatividades}>
      <Estrelas />
      <div className={styles.interacao}>
        <Favotiro />
        <Compartilhar />
      </div>
    </div>
  );
}

export default Interacoes;
