import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

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
    <div className={styles.gallery_layout_container}>
      {data?.products?.map((product, index) => (
        <Produto
          key={product._id}
          _id={product._id}
          link={product._id}
          name={product.name}
          price={product.price.toFixed(2).toString().replace('.', ',')}
          promotion={product.promotion}
          img={product.images}
        />
      ))}
    </div>
  );
};

export default Produtos;
