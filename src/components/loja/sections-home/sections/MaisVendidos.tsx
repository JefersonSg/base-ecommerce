import React from 'react';
import { getProductBySales } from '@/src/shared/api/GETS';
import SectionProdutosViews from '../SectionProdutosViews';

const MaisVendidos = async () => {
  const data = await getProductBySales();

  return <>{data.products ? <SectionProdutosViews data={data} /> : ''}</>;
};

export default MaisVendidos;
