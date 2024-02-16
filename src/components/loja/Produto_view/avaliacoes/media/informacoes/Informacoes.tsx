import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import Estrelas from '../../Estrelas';
import styles from './Informacoes.module.css';

function Informacoes({ comments }: { comments: CommentInterface[] }) {
  const totalStars = comments.map((comment) => +comment?.stars);

  const media =
    totalStars.reduce((acumulador, numero) => acumulador + numero, 0) /
    totalStars.length;

  return (
    <div className={styles.informacoes}>
      <h2 className={styles.numero_media}>{media.toFixed(2)}</h2>
      <p className={styles.texto_media}>
        baseado em {comments?.length ?? 0} comentários
      </p>
      <div className={styles.estrelas}>
        <Estrelas stars={media} />
      </div>
    </div>
  );
}

export default Informacoes;
