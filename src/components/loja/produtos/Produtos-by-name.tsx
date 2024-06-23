import React from 'react';
import Produtos from './Produtos';
import productsByNameGet from '@/src/actions/products-by-name-get';

const ProdutosContainer = async ({
  stringDecoded
}: {
  stringDecoded: string;
}) => {
  const data = await productsByNameGet({ id: stringDecoded });

  return (
    <div>
      <Produtos
        pesquisa={stringDecoded}
        data={data?.products}
        functionGetProduct={productsByNameGet}
      />
    </div>
  );
};

export default ProdutosContainer;
