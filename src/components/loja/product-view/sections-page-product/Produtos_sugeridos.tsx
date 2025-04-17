import React from 'react';
import SectionProdutosViews from '../../sections-home/SectionProdutosViews';
import styles from './ProdutosSugeridos.module.css';
import productsFilterGet from '@/src/actions/products-filters-get';

const ProdutosSugeridos = async ({ category }: { category: string }) => {
  const productsCategory = await productsFilterGet({
    active: true,
    category
  });
  return (
    <div className={styles.produtos_sugeridos_container}>
      {productsCategory?.products && productsCategory?.products?.length > 1 ? (
        <SectionProdutosViews
          functionGetProduct={productsFilterGet}
          texto={'Produtos Similares'}
          data={productsCategory.products}
          categoryId={category}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ProdutosSugeridos;
