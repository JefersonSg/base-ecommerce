import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import { getAllCategories } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsByPromotionsGet from '@/src/actions/products-by-promotions-get';

async function page() {
  const data = await productsByPromotionsGet();
  const categories = await getAllCategories();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Promoções" />
      <Suspense>
        <Produtos
          titulo="Promoções"
          data={data?.products}
          categorieDataSlide={categories}
          functionGetProduct={productsByPromotionsGet}
        />
      </Suspense>
    </div>
  );
}

export default page;
