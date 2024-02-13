'use client';

import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { Titulo } from '../../compartilhado/textos/Titulo';
import Interacoes from './interacoesUser/Interacoes';
import FotosProduto from './fotosProduto/FotosProduto';
import Detalhes from './produtoDetalhes/Detalhes';
import Sections from './sections/Sections';
import Avaliacoes from './avaliacoes/Avaliacoes';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/src/shared/api/GETS';
import { useParams } from 'next/navigation';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ContainerProduct = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<{ product: ProductApi }>({
    queryKey: ['product'],
    queryFn: async () => {
      const data = getProductById(id);

      return await data;
    }
  });
  return (
    <>
      {data && (
        <>
          <Breadcrumb texto="Home / Mulher / Cremes / Creme Hydra" />
          <Titulo titulo={data.product.name} />
          <Interacoes />
          <FotosProduto img={data?.product?.images} />
          <Detalhes data={data.product} />
          <Sections />
          <Avaliacoes />
        </>
      )}
    </>
  );
};

export default ContainerProduct;
