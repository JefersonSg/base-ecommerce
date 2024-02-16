import styles from './interacoes.module.css';
import Estrelas from './Estrelas';
import Favotiro from './Favotiro';
import Compartilhar from './Compartilhar';
import Update from './Update';

async function Interacoes({ id }: { id: string }) {
  return (
    <div className={styles.interatividades}>
      <Estrelas />
      <div className={styles.interacao}>
        <Update id={id} />
        <Favotiro />
        <Compartilhar />
      </div>
    </div>
  );
}

export default Interacoes;
