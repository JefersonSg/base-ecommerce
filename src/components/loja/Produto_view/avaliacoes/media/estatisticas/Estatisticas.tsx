import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import styles from './Estatisticas.module.css';
import Porcentagens from './Porcentagem';

function Estatisticas({ comments }: { comments?: CommentInterface[] }) {
  const uma = comments?.filter((comment) => +comment?.stars === 1) ?? [];
  const duas = comments?.filter((comment) => +comment?.stars === 2) ?? [];
  const tres = comments?.filter((comment) => +comment?.stars === 3) ?? [];
  const quatro = comments?.filter((comment) => +comment?.stars === 4) ?? [];
  const cinco = comments?.filter((comment) => +comment?.stars === 5) ?? [];

  const totalComentarios = comments?.length ?? 0;

  console.log(comments);

  return (
    <div className={styles.estatisticas}>
      <Porcentagens
        estrelas={5}
        porcentagem={
          comments?.length ? (cinco?.length * 100) / totalComentarios : 0
        }
      />
      <Porcentagens
        estrelas={4}
        porcentagem={
          comments?.length ? (quatro?.length * 100) / totalComentarios : 0
        }
      />
      <Porcentagens
        estrelas={3}
        porcentagem={
          comments?.length ? (tres?.length * 100) / totalComentarios : 0
        }
      />
      <Porcentagens
        estrelas={2}
        porcentagem={
          comments?.length ? (duas?.length * 100) / totalComentarios : 0
        }
      />
      <Porcentagens
        estrelas={1}
        porcentagem={
          comments?.length ? (uma?.length * 100) / totalComentarios : 0
        }
      />
    </div>
  );
}

export default Estatisticas;
