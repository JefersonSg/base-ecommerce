import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';

function page() {
  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto="Home / Produtos" />
      <Suspense>
        <Produtos />
      </Suspense>
    </div>
  );
}

export default page;
