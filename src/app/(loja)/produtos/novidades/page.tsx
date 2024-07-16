import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsFilterGet from '@/src/actions/products-filters-get';
import categoriesGetAll from '@/src/actions/category-get-all';

async function page() {
  const data = await productsFilterGet({ active: true });
  const categories = await categoriesGetAll();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Novidades" />
      <Suspense>
        <Produtos
          titulo="Novidades"
          data={data?.products}
          categorieDataSlide={categories}
          functionGetProduct={productsFilterGet}
          active={true}
        />
      </Suspense>
    </div>
  );
}

export default page;
