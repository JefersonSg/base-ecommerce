import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { Titulo } from '../../compartilhado/textos/Titulo';
import Interacoes from './interacoesUser/Interacoes';
import FotosProduto from './fotosProduto/FotosProduto';
import Detalhes from './produtoDetalhes/Detalhes';
import Sections from './sections-page-product/Sections';
import Avaliacoes from './avaliacoes/Avaliacoes';

import {
  type CommentInterface,
  type ProductApi
} from '@/src/shared/helpers/interfaces';
import { AvaliacoesProvider } from '@/src/shared/context/AvaliacaoContext';

const ContainerProduct = ({
  data,
  commentData,
  categoryName,
  subcategoryName
}: {
  data: { product: ProductApi };
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
      {data && (
        <>
          <Breadcrumb
            texto={`${'Home'} / ${categoryName ? categoryName + ' /' : ''}  ${
              subcategoryName ? subcategoryName + ' /' : ''
            } ${data?.product?.name}`}
          />
          <Titulo titulo={data?.product?.name} />
          <Interacoes id={data?.product?._id} stars={media} />
          <FotosProduto img={data?.product?.images} />
          <Detalhes data={data?.product} />
          <Sections data={data?.product} />
          <AvaliacoesProvider>
            <Avaliacoes />
          </AvaliacoesProvider>
        </>
      )}
    </>
  );
};

export default ContainerProduct;
