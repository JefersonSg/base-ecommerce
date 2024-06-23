import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import { getAllCategories } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsActiveGet from '@/src/actions/products-active-get';

async function page() {
  const data = await productsActiveGet();
  const categories = await getAllCategories();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Novidades" />
      <Suspense>
        <Produtos
          data={data?.products}
          categorieDataSlide={categories}
          functionGetProduct={productsActiveGet}
        />
      </Suspense>
    </div>
  );
}

export default page;
