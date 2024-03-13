import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import { getAllActiveProducts, getAllCategories } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';

async function page() {
  const data = await getAllActiveProducts();
  const categories = await getAllCategories();

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto="Home / Produtos" />
      <Produtos data={data} categorieDataSlide={categories} />
    </div>
  );
}

export default page;
