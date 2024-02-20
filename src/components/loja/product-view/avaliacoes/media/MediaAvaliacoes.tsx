'use client';

import styles from './MediaAvaliacoes.module.css';
import Informacoes from './informacoes/Informacoes';
import Estatisticas from './estatisticas/Estatisticas';
import {
  type CommentContextInterface,
  useCommentContext
} from '@/src/shared/context/AvaliacaoContext';

function MediaAvaliacoes() {
  const { dataComments } = useCommentContext() as CommentContextInterface;

  return (
    <div className={styles.media_avaliacoes}>
      <Informacoes comments={dataComments?.comments} />
      <Estatisticas comments={dataComments?.comments} />
    </div>
  );
}

export default MediaAvaliacoes;
