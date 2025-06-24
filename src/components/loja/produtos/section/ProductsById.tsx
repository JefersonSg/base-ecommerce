import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

// import styles from './Produtos.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ProductsById = ({
  data,
  setIsLoading,
  setModalLogin,
  setMessagePopUp,
  setTypePopUp,
  setNameProduct,
  setPriceProduct,
  setImageProduct
}: {
  data: ProductApi[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  setNameProduct: React.Dispatch<React.SetStateAction<string>>;
  setPriceProduct: React.Dispatch<React.SetStateAction<number>>;
  setImageProduct: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={'gallery_layout_container'}>
      {data?.map((product, index) => (
        <Produto
          key={product._id + index}
          productData={product}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          setIsLoading={setIsLoading}
          setModalLogin={setModalLogin}
          setImageProduct={setImageProduct}
          setNameProduct={setNameProduct}
          setPriceProduct={setPriceProduct}
        />
      ))}
    </div>
  );
};

export default ProductsById;
