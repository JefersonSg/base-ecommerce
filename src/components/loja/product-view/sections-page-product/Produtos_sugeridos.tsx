import React from 'react';
import SectionProdutosViews from '../../sections-home/SectionProdutosViews';
import styles from './ProdutosSugeridos.module.css';
import productsByCategoryGet from '@/src/actions/products-by-category-get ';

const ProdutosSugeridos = async ({ category }: { category: string }) => {
  const productsCategory = await productsByCategoryGet({ id: category });
  return (
    <div className={styles.produtos_sugeridos_container}>
      {productsCategory?.products && productsCategory?.products?.length > 1 ? (
        <SectionProdutosViews
          functionGetProduct={productsByCategoryGet}
          texto={'Produtos Similares'}
          data={productsCategory.products}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ProdutosSugeridos;
