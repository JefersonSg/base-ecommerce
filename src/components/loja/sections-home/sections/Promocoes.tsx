import React from 'react';
import Section from '../Section';
import productsFilterGet from '@/src/actions/products-filters-get';

const Promocoes = async () => {
  const data = await productsFilterGet({ active: true, promotion: true });

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
