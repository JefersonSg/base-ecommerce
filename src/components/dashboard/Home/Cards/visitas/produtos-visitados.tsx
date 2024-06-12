import React from 'react';
import styles from './produto-visitado.module.css';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Link from 'next/link';

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
            className={styles.foto_produto}
            src={data?.product.images?.[0] ?? ''}
            width={40}
            height={40}
          />
          <div className={styles.info_produto}>
            <Link href={`/produtos/produto/${data.product._id}`}>
              {data?.product?.name?.slice(0, 18)}
            </Link>
          </div>
          {views ?? 0} visitas
        </div>
      )}
    </>
  );
};

export default ProdutosVisitados;
