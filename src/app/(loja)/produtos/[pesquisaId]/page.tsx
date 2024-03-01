import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';

import React from 'react';
import ProdutosContainer from '@/src/components/loja/produtos/Produtos-by-name';

function page({ params }: { params: { pesquisaId: string } }) {
  const stringDecoded = decodeURIComponent(params.pesquisaId);

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto={`Home / Produtos / pesquisa`} />
      <ProdutosContainer stringDecoded={stringDecoded} />
    </div>
  );
}

export default page;
