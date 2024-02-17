import styles from './Avaliacoes.module.css';
import Comentarios from './comentarios/Comentarios';
import Media from './media/Media';

async function Avaliacoes({ id }: { id: string }) {
  return (
    <div className={styles.avaliacoes_container}>
      <h1 className={styles.titulo}>Avaliações</h1>
      <Media />
      <Comentarios />
    </div>
  );
}

export default Avaliacoes;
