import React from 'react';
import SectionProdutosViews from '../SectionProdutosViews';
import productsFilterGet from '@/src/actions/products-filters-get';

const MaisVistos = async () => {
  const data = await productsFilterGet({
    active: true,
    promotion: true,
    page: 1,
    total: 9
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
