'use client';

import styles from './MediaAvaliacoes.module.css';
import Informacoes from './informacoes/Informacoes';
import Estatisticas from './estatisticas/Estatisticas';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import { getAllComments } from '@/src/shared/api/GETS';

interface PageParams {
  id: string;
}

function MediaAvaliacoes() {
  const pathname = useParams() as unknown as PageParams;

  const { data } = useQuery<{ comments: CommentInterface[] }>({
    queryKey: ['comments-id-' + pathname.id],
    queryFn: async () => {
      return await getAllComments(pathname.id);
    }
  });

  return (
    <div className={styles.media_avaliacoes}>
      <Informacoes comments={data?.comments} />
      <Estatisticas comments={data?.comments} />
    </div>
  );
}

export default MediaAvaliacoes;
