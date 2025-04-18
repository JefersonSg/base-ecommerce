import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';

import React, { Suspense } from 'react';
import ProdutosContainer from '@/src/components/loja/produtos/Produtos-by-name';

function page({ params }: { params: { pesquisaId: string } }) {
  const stringDecoded = decodeURIComponent(params.pesquisaId);

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1={stringDecoded} />
      <Suspense>
        <ProdutosContainer stringDecoded={stringDecoded} />
      </Suspense>
    </div>
  );
}

export default page;
