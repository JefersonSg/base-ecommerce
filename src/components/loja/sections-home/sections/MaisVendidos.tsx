import React from 'react';
import Section from '../Section';
import productsFilterGet from '@/src/actions/products-filters-get';

const MaisVendidos = async () => {
  const data = await productsFilterGet({ active: true, orderBy: 'sales' });

  return (
    <Section
      data={data}
      nomeSessao="Mais Vendidos"
      link={'mais-vendidos'}
      textoBotao="Ver mais vendidos"
    />
  );
};

export default MaisVendidos;
