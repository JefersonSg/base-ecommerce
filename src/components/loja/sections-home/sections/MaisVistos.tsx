import React from 'react';
import SectionProdutosViews from '../SectionProdutosViews';
import productsFilterGet from '@/src/actions/products-filters-get';

const MaisVistos = async () => {
  const data = await productsFilterGet({
    active: true,
    orderDirection: 'desc'
  });

  return (
    <>
      {data?.products && (
        <SectionProdutosViews
          data={data?.products}
          functionGetProduct={productsFilterGet}
        />
      )}
    </>
  );
};
export default MaisVistos;
