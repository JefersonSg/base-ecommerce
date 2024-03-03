import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

import styles from './Produtos.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ProductsById = ({
  data,
  totalProdutos
}: {
  data: { products: ProductApi[] };
  totalProdutos: number;
}) => {
  return (
    <div className={styles.produtos}>
      {data?.products?.map((product, index) => {
        return (
          <div key={product?._id}>
            {index <= totalProdutos && (
              <Produto
                _id={product._id}
                link={product?._id}
                name={product?.name}
                price={product?.price?.toFixed(2)?.replace('.', ',')}
                promotion={false}
                img={product?.images}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsById;
