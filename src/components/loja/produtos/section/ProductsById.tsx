import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

import styles from './Produtos.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ProductsById = ({ data }: { data: { products: ProductApi[] } }) => {
  return (
    <div className={styles.produtos}>
      {data?.products?.map((product) => {
        return (
          <Produto
            _id={product._id}
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

export default ProductsById;
