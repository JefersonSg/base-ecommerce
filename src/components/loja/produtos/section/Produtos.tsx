import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

import { useQuery } from '@tanstack/react-query';
import productsFilterGet from '@/src/actions/products-filters-get';

const Produtos = ({
  setIsLoading,
  setModalLogin,
  setMessagePopUp,
  setTypePopUp,
  setNameProduct,
  setPriceProduct,
  setImageProduct
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  setNameProduct: React.Dispatch<React.SetStateAction<string>>;
  setPriceProduct: React.Dispatch<React.SetStateAction<number>>;
  setImageProduct: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsFilterGet({ active: true })
  });

  return (
    <div className={'gallery_layout_container'}>
      {data?.products?.map((product) => (
        <Produto
          key={product._id}
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

export default Produtos;
