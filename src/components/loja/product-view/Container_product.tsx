import React, { Suspense } from 'react';
import { Titulo } from '../../compartilhado/textos/Titulo';
import Interacoes from './interacoesUser/Interacoes';
import FotosProduto from './fotosProduto/FotosProduto';
import Detalhes from './produtoDetalhes/Detalhes';
import Sections from './sections-page-product/Sections';
import styles from './Produto.module.css';

import { type ProductApi } from '@/src/shared/helpers/interfaces';
import ProdutosSugeridos from './sections-page-product/Produtos_sugeridos';
import BreadcrumbProduct from './breadcrumb-product';

const ContainerProduct = async ({
  productData
}: {
  productData: ProductApi;
}) => {
  return (
    <>
      <Suspense fallback={<div className={styles.start_loading}></div>}>
        <BreadcrumbProduct
          categoryId={productData?.category}
          subcategoryId={productData?.subcategory}
          productName={productData?.name}
        />
      </Suspense>

      <FotosProduto img={productData?.images} />
      <div className={`title_bold_24px ${styles.titulo}`}>
        <Titulo titulo={productData?.name} />
      </div>
      <div className={styles.navegação}></div>
      <Interacoes id={productData._id} />
      <Suspense>
        <Detalhes data={productData} />
        <Sections data={productData} />
      </Suspense>

      <Suspense>
        <ProdutosSugeridos category={productData?.category} />
      </Suspense>
    </>
  );
};

export default ContainerProduct;
