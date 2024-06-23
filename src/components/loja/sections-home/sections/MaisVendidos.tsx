import React from 'react';
import Section from '../Section';
import productsBySalesGet from '@/src/actions/products-by-sales-get';

const MaisVendidos = async () => {
  const data = await productsBySalesGet();

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
