import React from 'react';
import Produto from '@/src/components/loja/produto/Produto';
import styles from './Produtos.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const Produtos = () => {
  const { data } = useQuery<{ products: ProductApi[] }>({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  return (
    <div className={styles.produtos}>
      {data?.products?.map((product) => {
        return (
          <Produto
            key={product?._id}
            link={product?._id}
            name={product?.name}
            price={product?.price?.toFixed(2)?.replace('.', ',')}
            promotion={false}
            img={product?.images}
          />
        );
      })}
    </div>
  );
};

export default Produtos;
