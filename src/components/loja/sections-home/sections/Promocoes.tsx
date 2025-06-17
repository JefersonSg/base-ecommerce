'use client';

import React from 'react';
import Section from '../Section';
import productsFilterGet from '@/src/actions/products-filters-get';
import { useQuery } from '@tanstack/react-query';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const Promocoes = () => {
  const { data } = useQuery<{ products: ProductApi[] }>({
    queryKey: ['product-promotion-true'],
    queryFn: async () => {
      return await productsFilterGet({ active: true, promotion: true });
    }
  });

  return (
    <Section
      data={data}
      nomeSessao="Promoções"
      link={'promocoes'}
      textoBotao="Todas as promoções"
    />
  );
};

export default Promocoes;
