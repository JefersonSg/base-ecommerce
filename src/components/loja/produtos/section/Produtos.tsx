import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

import { useQuery } from '@tanstack/react-query';
import { getAllActiveProducts } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const Produtos = ({
  setIsLoading,
  setModalLogin,
  setMessagePopUp,
  setTypePopUp
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useQuery<{ products: ProductApi[] }>({
    queryKey: ['products'],
    queryFn: getAllActiveProducts
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
        />
      ))}
    </div>
  );
};

export default Produtos;
