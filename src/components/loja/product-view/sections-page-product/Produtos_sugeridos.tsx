import React from 'react';
import SectionProdutosViews from '../../sections-home/SectionProdutosViews';
import { getProductsByCategory } from '@/src/shared/api/GETS';
import styles from './ProdutosSugeridos.module.css';

const ProdutosSugeridos = async ({ category }: { category: string }) => {
  const productsCategory = category && (await getProductsByCategory(category));
  return (
    <div className={styles.produtos_sugeridos_container}>
      {productsCategory?.products?.length > 1 ? (
        <SectionProdutosViews
          texto={'Produtos Similares'}
          data={productsCategory}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ProdutosSugeridos;
