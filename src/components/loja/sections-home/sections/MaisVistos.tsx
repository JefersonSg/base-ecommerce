import React from 'react';
import SectionProdutosViews from '../SectionProdutosViews';
import productsByViewsGet from '@/src/actions/products-by-views-get';

const MaisVistos = async () => {
  const data = await productsByViewsGet();

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
