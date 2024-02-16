import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import styles from './Estatisticas.module.css';
import Porcentagens from './Porcentagem';

function Estatisticas({ comments }: { comments: CommentInterface[] }) {
  const uma = comments.filter((comment) => +comment.stars === 1);
  const duas = comments.filter((comment) => +comment.stars === 2);
  const tres = comments.filter((comment) => +comment.stars === 3);
  const quatro = comments.filter((comment) => +comment.stars === 4);
  const cinco = comments.filter((comment) => +comment.stars === 5);

  const totalComentarios = comments.length;

  return (
    <div className={styles.estatisticas}>
      <Porcentagens
        estrelas={5}
        porcentagem={(cinco.length * 100) / totalComentarios}
      />
      <Porcentagens
        estrelas={4}
        porcentagem={(quatro.length * 100) / totalComentarios}
      />
      <Porcentagens
        estrelas={3}
        porcentagem={(tres.length * 100) / totalComentarios}
      />
      <Porcentagens
        estrelas={2}
        porcentagem={(duas.length * 100) / totalComentarios}
      />
      <Porcentagens
        estrelas={1}
        porcentagem={(uma.length * 100) / totalComentarios}
      />
    </div>
  );
}

export default Estatisticas;
