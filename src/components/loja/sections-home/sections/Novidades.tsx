import React from 'react';
import Section from '../Section';
import productsActiveGet from '@/src/actions/products-active-get';

const Novidades = async () => {
  const data = await productsActiveGet();

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
