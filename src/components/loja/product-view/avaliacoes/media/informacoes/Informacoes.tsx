import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import Estrelas from '../../../../../compartilhado/estrelas/Estrelas';
import styles from './Informacoes.module.css';

function Informacoes({ comments }: { comments?: CommentInterface[] }) {
  const totalStars = comments?.map((comment) => +comment?.stars) ?? [1];

  const media =
    totalStars?.reduce((acumulador, numero) => acumulador + numero, 0) /
      totalStars?.length ?? 1;

  return (
    <div className={styles.informacoes}>
      <h2 className={styles.numero_media}>
        {media ? media?.toFixed(1) : '5.0'}
      </h2>
      <p className={styles.texto_media}>
        baseado em {comments?.length ?? 0} comentários
      </p>
      <div className={styles.estrelas}>
        <Estrelas stars={!Number.isNaN(media) ? media : 0} type={1} />
      </div>
    </div>
  );
}

export default Informacoes;
