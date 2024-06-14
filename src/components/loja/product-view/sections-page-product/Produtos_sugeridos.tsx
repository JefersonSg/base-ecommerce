import React from 'react';
import SectionProdutosViews from '../../sections-home/SectionProdutosViews';
import { getProductsByCategory } from '@/src/shared/api/GETS';

const ProdutosSugeridos = async ({ category }: { category: string }) => {
  const productsCategory = category && (await getProductsByCategory(category));
  return (
    <>
      {productsCategory?.products?.length > 1 ? (
        <SectionProdutosViews
          texto={'Produtos Similares'}
          data={productsCategory}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ProdutosSugeridos;
