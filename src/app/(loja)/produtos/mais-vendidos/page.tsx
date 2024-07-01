import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsFilterGet from '@/src/actions/products-filters-get';
import categoriesGetAll from '@/src/actions/category-get-all';

async function page() {
  const data = await productsFilterGet({ orderBy: 'sales' });
  const categories = await categoriesGetAll();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Mais vendidos" />
      <Suspense>
        <Produtos
          titulo="Mais vendidos"
          data={data?.products}
          functionGetProduct={productsFilterGet}
          categorieDataSlide={categories}
          orderBy="sales"
          orderDirection=""
        />
      </Suspense>
    </div>
  );
}

export default page;
