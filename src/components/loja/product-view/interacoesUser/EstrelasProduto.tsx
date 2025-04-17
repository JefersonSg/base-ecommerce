import Estrelas from '@/src/components/compartilhado/estrelas/Estrelas';
import Link from 'next/link';
import styles from './interacoes.module.css';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import { getAllComments } from '@/src/shared/api/GETS';

export default async function EstrelasProduto({ id }: { id: string }) {
  const commentData: { comments: CommentInterface[] } =
    await getAllComments(id);
  const totalStars = commentData?.comments?.map(
    (comment) => +comment?.stars
  ) ?? [1];

  const stars =
    totalStars?.reduce((acumulador, numero) => acumulador + numero, 0) /
      totalStars?.length ?? 1;
  return (
    <>
      <Link className={styles.estrelas} href={'#avaliacoes'} scroll={true}>
        <Estrelas stars={stars} type={1} />
      </Link>
    </>
  );
}
