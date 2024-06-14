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
import AddViewFunc from '../../compartilhado/AddViewFunc';
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
  const totalStars = commentData?.comments?.map(
    (comment) => +comment?.stars
  ) ?? [1];

  const media =
    totalStars?.reduce((acumulador, numero) => acumulador + numero, 0) /
      totalStars?.length ?? 1;

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
      <Interacoes id={productData?._id} stars={media} />
      <FotosProduto img={productData?.images} />
      <Detalhes data={productData} />
      <Sections data={productData} />

      <AddViewFunc productId={productData?._id} />

      <Suspense>
        <ProdutosSugeridos category={productData?.category} />
      </Suspense>
    </>
  );
};

export default ContainerProduct;
