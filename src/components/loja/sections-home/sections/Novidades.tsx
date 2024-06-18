import React from 'react';
import Section from '../Section';
import { getAllActiveProducts } from '@/src/shared/api/GETS';

const Novidades = async () => {
  const data = await getAllActiveProducts();

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
