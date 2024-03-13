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
    <div className={styles.gallery_layout_container}>
      {data?.products?.map(
        (product, index) =>
          index <= totalProdutos && (
            <Produto key={product._id} productData={product} />
          )
      )}
    </div>
  );
};

export default ProductsById;
