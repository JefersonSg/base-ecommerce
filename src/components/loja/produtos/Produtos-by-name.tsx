'use client';

import { getProductByName } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Produtos from './Produtos';

const ProdutosContainer = ({ stringDecoded }: { stringDecoded: string }) => {
  const { data } = useQuery<{ products: ProductApi[] }>({
    queryKey: ['product_name_page'],
    queryFn: async () => {
      return await getProductByName(stringDecoded);
    }
  });

  return (
    <div>
      <Produtos pesquisa={stringDecoded} data={data} />
    </div>
  );
};

export default ProdutosContainer;
