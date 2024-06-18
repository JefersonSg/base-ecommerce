import { getProductByPromotion } from '@/src/shared/api/GETS';
import React from 'react';
import Section from '../Section';

const Promocoes = async () => {
  const data = await getProductByPromotion();

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
