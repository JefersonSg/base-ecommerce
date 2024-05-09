import React from 'react';
import styles from './produto-visitado.module.css';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ProdutosVisitados = ({
  productId,
  views
}: {
  productId: string;
  views: number;
}) => {
  const { data } = useQuery<{ product: ProductApi }>({
    queryKey: ['get-product-by-id-', productId],
    queryFn: async () => {
      return await getProductById(productId);
    }
  });
  return (
    <>
      {data?.product && (
        <div className={styles.produto_view}>
          <Image
            alt="Foto do produto"
            src={data?.product.images?.[0] ?? ''}
            width={56}
            height={56}
          />
          <div className={styles.info_produto}>
            <p>{data?.product.name}</p>
          </div>
          {views ?? 0} views
        </div>
      )}
    </>
  );
};

export default ProdutosVisitados;
