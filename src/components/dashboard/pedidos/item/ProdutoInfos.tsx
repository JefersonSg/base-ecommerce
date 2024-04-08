'use client';
import Image from 'next/image';
import styles from './ProdutoInfos.module.css';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ProdutoInfos = ({ productId }: { productId: string }) => {
  const { data } = useQuery({
    queryKey: ['product-by-id-' + productId],
    queryFn: async () => {
      return (await getProductById(productId)) as { product: ProductApi };
    }
  });
  return (
    <div className={styles.produto}>
      <div className={styles.imagem_produto}>
        {data?.product?.images[0] && (
          <Image
            alt="Imagem do produto"
            src={data.product.images[0]}
            width={50}
            height={50}
          />
        )}
      </div>
      <div className={styles.informacoes_produto}>
        <Link
          href={{ pathname: 'products', query: { _id: 'productId' } }}
          className={styles.nome}
        >
          Name do produto
        </Link>
        <div>
          <p>
            <span className={styles.quantidade}>5 un </span>
            <span className={styles.valor}>R$ 29,90</span>
          </p>
          <span className={styles.total}>Total: 89,90</span>
        </div>
      </div>
    </div>
  );
};

export default ProdutoInfos;
