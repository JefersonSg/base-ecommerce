import React from 'react';
import styles from './Cabecalho.module.css';
import { getAllComments } from '@/src/shared/api/GETS';
import Image from 'next/image';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import Update from '../interacoesUser/Update';

const Cabecalho = async ({
  nomeProduto,
  idProduto
}: {
  nomeProduto: string;
  idProduto: string;
}) => {
  const commentData: { comments: CommentInterface[] } =
    await getAllComments(idProduto);
  const totalStars = commentData?.comments?.map(
    (comment) => +comment?.stars
  ) ?? [1];
  const stars =
    totalStars?.reduce((acumulador, numero) => acumulador + numero, 0) /
      totalStars?.length || 5;

  return (
    <div className={styles.cabecalho}>
      <Update id={idProduto} />
      <div className={` ${styles.titulo}`}>
        <h1 className={styles.nome_produto}>{nomeProduto}</h1>
      </div>
      <div className={styles.avaliacao}>
        <p>{stars.toFixed(1)}</p>
        <Image
          className={styles.estrela}
          alt="Estrela de avaliação"
          src={'/estrelas/claras/estrela_cheia.svg'}
          width={21}
          height={20}
          unoptimized
        />
      </div>
    </div>
  );
};

export default Cabecalho;
