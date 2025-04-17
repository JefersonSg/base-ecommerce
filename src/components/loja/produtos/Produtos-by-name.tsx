import React from 'react';
import Produtos from './Produtos';
import productsFilterGet from '@/src/actions/products-filters-get';

const ProdutosContainer = async ({
  stringDecoded
}: {
  stringDecoded: string;
}) => {
  const data = await productsFilterGet({ name: stringDecoded });

  return (
    <div>
      <Produtos
        pesquisa={stringDecoded}
        data={data?.products}
        functionGetProduct={productsFilterGet}
      />
    </div>
  );
};

export default ProdutosContainer;
