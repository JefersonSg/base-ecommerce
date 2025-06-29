import React from 'react';
import styles from './produto-visitado.module.css';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import productByIdGet from '@/src/actions/product-by-id-get';

const ProdutosVisitados = ({
  productId,
  views
}: {
  productId: string;
  views?: number;
}) => {
  const { data } = useQuery({
    queryKey: ['get-product-by-id-', productId],
    queryFn: async () => {
      return await productByIdGet({ id: productId });
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
            unoptimized
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
