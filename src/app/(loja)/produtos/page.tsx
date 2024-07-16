import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsFilterGet from '@/src/actions/products-filters-get';

async function page() {
  const data = await productsFilterGet({ active: true });
  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Produtos" />
      <Suspense>
        <Produtos
          data={data?.products}
          functionGetProduct={productsFilterGet}
          active={true}
        />
      </Suspense>
    </div>
  );
}

export default page;
