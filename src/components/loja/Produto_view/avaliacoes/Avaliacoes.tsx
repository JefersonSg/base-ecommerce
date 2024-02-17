import styles from './Avaliacoes.module.css';
import Comentarios from './comentarios/Comentarios';
import Media from './media/Media';
import { getAllComments } from '@/src/shared/api/GETS';

async function Avaliacoes({ id }: { id: string }) {
  const data = await getAllComments(id);

  return (
    <div className={styles.avaliacoes_container}>
      <h1 className={styles.titulo}>Avaliações</h1>
      <Media data={data} />
      {data && <Comentarios dataComments={data} />}
    </div>
  );
}

export default Avaliacoes;
