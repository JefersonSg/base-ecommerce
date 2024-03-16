import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import { getAllCategories, getProductBySales } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';

async function page() {
  const data = await getProductBySales();
  const categories = await getAllCategories();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto="Home / Produtos" />
      <Suspense>
        <Produtos data={data} categorieDataSlide={categories} />
      </Suspense>
    </div>
  );
}

export default page;
