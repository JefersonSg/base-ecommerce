import { getProductsByViews } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import React from 'react';
import Section from '../Section';

const MaisVistos = async () => {
  const data = (await getProductsByViews()) as {
    products: ProductApi[];
  };

  return (
    <>
      {data.products ? (
        <Section
          data={data}
          nomeSessao="Promoções"
          link={'promocoes'}
          textoBotao="Todas as promoções"
        />
      ) : (
        ''
      )}
    </>
  );
};

export default MaisVistos;
