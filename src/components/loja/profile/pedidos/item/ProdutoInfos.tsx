'use client';
import Image from 'next/image';
import styles from './ProdutoInfos.module.css';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import productByIdGet from '@/src/actions/product-by-id-get';

const ProdutoInfos = ({
  productId,
  valorPago,
  quantidade
}: {
  productId: string;
  valorPago: number;
  quantidade: number;
}) => {
  const { data } = useQuery({
    queryKey: ['product-by-id-' + productId],
    queryFn: async () => {
      return (await productByIdGet({ id: productId })) as {
        product: ProductApi;
      };
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
            unoptimized
          />
        )}
      </div>
      <div className={styles.informacoes_produto}>
        <Link href={`/produtos/produto/${productId}`} className={styles.nome}>
          {data?.product?.name}
        </Link>
        <div className={styles.container_valores}>
          <p>
            <span className={styles.quantidade}>{quantidade} un </span>
            <span className={styles.valor}>
              R$ {convertNumberInReal(valorPago)}
            </span>
          </p>
          <span className={styles.total}>
            Total: {convertNumberInReal(valorPago * quantidade)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProdutoInfos;
