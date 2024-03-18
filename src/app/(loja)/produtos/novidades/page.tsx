import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import { getAllActiveProducts, getAllCategories } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';

async function page() {
  const data = await getAllActiveProducts();
  const categories = await getAllCategories();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Novidades" />
      <Suspense>
        <Produtos data={data} categorieDataSlide={categories} />
      </Suspense>
    </div>
  );
}

export default page;
