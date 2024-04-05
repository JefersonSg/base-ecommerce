import { getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Produto.module.css';

const ProdutosFinalizar = ({
  productId,
  color,
  size,
  amount,
  total
}: {
  productId: string;
  color: string;
  size: string;
  amount: number;
  total: number;
}) => {
  const { data } = useQuery<{ product: ProductApi }>({
    queryKey: ['product', productId],
    queryFn: async () => {
      return await getProductById(productId);
    }
  });
  return (
    <tr className={styles.produto_finalizar}>
      <td className={styles.informacoes_produto}>
        {data?.product && (
          <Link href={{ pathname: '/produto', query: { _id: productId } }}>
            <Image
              alt="Imagem do produto"
              src={data?.product?.images?.[0]}
              placeholder="blur"
              blurDataURL={data?.product?.images?.[0]}
              width={104}
              height={135}
              quality={40}
            />
          </Link>
        )}
        <td className={styles.informacoes}>
          <Link
            className={styles.titulo}
            href={{ pathname: '/produto', query: { _id: productId } }}
          >
            {data?.product?.name ?? 'carregando...'}
          </Link>
          <p>
            <span>Cor: </span> {color}
          </p>
          <p>
            <span>Tamanho: </span> {size}
          </p>
        </td>
      </td>
      <td className={styles.valor_produto}>
        <p
          className={`${styles.valor} ${
            data?.product?.promotion && data?.product?.promotionalPrice
              ? styles.promotion
              : ''
          }`}
        >
          <span> R$ {Number(data?.product?.price).toFixed(2)}</span>
          R$ {Number(total / amount).toFixed(2)}
        </p>
      </td>
      <td className={styles.quantidade_table}>
        <span>-</span>
        <p>{amount ?? 1}</p>
        <span>+</span>
      </td>
      <td className={styles.total_table}>
        <td className={styles.valor_produto}>
          <p
            className={`${styles.valor} ${
              data?.product?.promotion && data?.product?.promotionalPrice
                ? styles.promotion
                : ''
            }`}
          >
            <span>
              {' '}
              de R$ {(Number(data?.product?.price) * amount).toFixed(2)}
            </span>
            por R$ {total?.toFixed(2)}
          </p>
        </td>
      </td>
    </tr>
  );
};

export default ProdutosFinalizar;
