import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import categoriesGetAll from '@/src/actions/category-get-all';
import productsFilterGet from '@/src/actions/products-filters-get';

async function page() {
  const data = await productsFilterGet({ active: true, promotion: true });
  const categories = await categoriesGetAll();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Promoções" />
      <Suspense>
        <Produtos
          titulo="Promoções"
          data={data?.products}
          categorieDataSlide={categories}
          functionGetProduct={productsFilterGet}
          active={true}
          promotion={true}
        />
      </Suspense>
    </div>
  );
}

export default page;
