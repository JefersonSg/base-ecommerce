import { getProductsByViews } from '@/src/shared/api/GETS';
import React from 'react';
import SectionProdutosViews from '../SectionProdutosViews';

const MaisVistos = async () => {
  const data = await getProductsByViews();

  return <SectionProdutosViews data={data} />;
};
export default MaisVistos;
