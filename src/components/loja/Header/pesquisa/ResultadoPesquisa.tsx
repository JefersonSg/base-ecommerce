'use client';

import { getProductByName } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import styles from './ResultadoPesquisa.module.css';
import React from 'react';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ResultadoPesquisa = ({ pesquisa }: { pesquisa: string }) => {
  const { data } = useQuery<{ products: ProductApi[] }>({
    queryKey: ['product-name', pesquisa],
    queryFn: async () => {
      if (pesquisa) {
        return await getProductByName(pesquisa);
      }
      return [];
    }
  });
  return (
    <div className={styles.resultado_container}>
      {data?.products?.map((product) => {
        return (
          <div className={styles.produco_pesquisa} key={product?._id}>
            <p>{product?.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ResultadoPesquisa;
