import React, { Suspense } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { Titulo } from '../../compartilhado/textos/Titulo';
import Interacoes from './interacoesUser/Interacoes';
import FotosProduto from './fotosProduto/FotosProduto';
import Detalhes from './produtoDetalhes/Detalhes';
import Sections from './sections-page-product/Sections';
import styles from './Produto.module.css';

import {
  type CommentInterface,
  type ProductApi
} from '@/src/shared/helpers/interfaces';
import ProdutosSugeridos from './sections-page-product/Produtos_sugeridos';

const ContainerProduct = async ({
  productData,
  commentData,
  categoryName,
  subcategoryName
}: {
  productData: ProductApi;
  commentData: { comments: CommentInterface[] };
  categoryName: string;
  subcategoryName: string;
}) => {
  return (
    <>
      <Breadcrumb
        texto1={categoryName}
        link1={`/produtos/categoria?_id=${productData.category}`}
        texto2={subcategoryName}
        link2={`/produtos/subcategoria?_id=${productData.subcategory}`}
        texto3={productData.name}
      />
      <div className={`title_bold_24px ${styles.titulo}`}>
        <Titulo titulo={productData?.name} />
      </div>
      <div className={styles.navegação}></div>
      <Interacoes id={productData._id} />
      <FotosProduto img={productData?.images} />
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
