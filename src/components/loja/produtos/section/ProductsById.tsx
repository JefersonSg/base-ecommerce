import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

// import styles from './Produtos.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ProductsById = ({
  data,
  totalProdutos,
  setIsLoading,
  setModalLogin,
  setMessagePopUp,
  setTypePopUp
}: {
  data: { products: ProductApi[] };
  totalProdutos: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={'gallery_layout_container'}>
      {data?.products?.map(
        (product, index) =>
          index <= totalProdutos && (
            <Produto
              key={product._id}
              productData={product}
              setMessagePopUp={setMessagePopUp}
              setTypePopUp={setTypePopUp}
              setIsLoading={setIsLoading}
              setModalLogin={setModalLogin}
            />
          )
      )}
    </div>
  );
};

export default ProductsById;
