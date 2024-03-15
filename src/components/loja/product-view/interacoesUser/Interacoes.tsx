import styles from './interacoes.module.css';
import Estrelas from '../../../compartilhado/estrelas/Estrelas';
import Favotiro from './Favotiro';
import Compartilhar from './Compartilhar';
import Update from './Update';

async function Interacoes({ id, stars }: { id: string; stars: number }) {
  return (
    <div className={styles.interatividades}>
      <Estrelas stars={stars} type={1} />
      <div className={styles.interacao}>
        <Update id={id} />
        <Favotiro productId={id} />
        <Compartilhar />
      </div>
    </div>
  );
}

export default Interacoes;
