import React from 'react';
import SectionProdutosViews from '../SectionProdutosViews';
import productsByViewsGet from '@/src/actions/products-by-views-get';
import productsFilterGet from '@/src/actions/products-filters-get';

const MaisVistos = async () => {
  const data = await productsFilterGet({ page: 1, total: 9 });

  return (
    <>
      {data?.products && (
        <SectionProdutosViews
          data={data?.products}
          functionGetProduct={productsByViewsGet}
        />
      )}
    </>
  );
};
export default MaisVistos;
