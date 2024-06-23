import React from 'react';
import Section from '../Section';
import productsByPromotionsGet from '@/src/actions/products-by-promotions-get';

const Promocoes = async () => {
  const data = await productsByPromotionsGet();

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
