import React, { Suspense } from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { Titulo } from '../../compartilhado/textos/Titulo';
import Interacoes from './interacoesUser/Interacoes';
import FotosProduto from './fotosProduto/FotosProduto';
import Detalhes from './produtoDetalhes/Detalhes';
import Sections from './sections-page-product/Sections';
import Avaliacoes from './avaliacoes/Avaliacoes';
import styles from './Produto.module.css';

import {
  type CommentInterface,
  type ProductApi
} from '@/src/shared/helpers/interfaces';
import { addViews } from '@/src/shared/api/CREATE';
import { cookies } from 'next/headers';

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

  const token = cookies().get('auth_token')?.value;

  await addViews(productData._id, token);

  return (
    <>
      <Breadcrumb
        texto1={categoryName}
        link1={`/produtos/categoria?_id=${productData.category}`}
        texto2={subcategoryName}
        link2={`/produtos/subcategoria?_id=${productData.subcategory}`}
        texto3={productData.name}
      />
      <div className={styles.titulo}>
        <Titulo titulo={productData?.name} />
      </div>
      <div className={styles.navegação}></div>
      <Interacoes id={productData?._id} stars={media} />
      <FotosProduto img={productData?.images} />
      <Detalhes data={productData} />
      <Sections data={productData} />
      <Suspense>
        <Avaliacoes />
      </Suspense>
    </>
  );
};

export default ContainerProduct;
