import React from 'react';
import Section from '../Section';
import productsFilterGet from '@/src/actions/products-filters-get';

const Novidades = async () => {
  const data = await productsFilterGet({
    active: true,
    orderDirection: 'desc'
  });

  return (
    <Section
      data={data}
      nomeSessao="Novidades"
      link={'novidades'}
      textoBotao="Todas as novidades"
    />
  );
};

export default Novidades;
