import React from 'react';
import { getProductBySales } from '@/src/shared/api/GETS';
import Section from '../Section';

const MaisVendidos = async () => {
  const data = await getProductBySales();

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
