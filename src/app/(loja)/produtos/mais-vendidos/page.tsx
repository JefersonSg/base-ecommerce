import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import { getAllCategories } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsBySalesGet from '@/src/actions/products-by-sales-get';

async function page() {
  const data = await productsBySalesGet();
  const categories = await getAllCategories();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Mais vendidos" />
      <Suspense>
        <Produtos
          titulo="Mais vendidos"
          data={data?.products}
          functionGetProduct={productsBySalesGet}
          categorieDataSlide={categories}
        />
      </Suspense>
    </div>
  );
}

export default page;
