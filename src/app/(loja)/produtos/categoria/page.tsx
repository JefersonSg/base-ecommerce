import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import {
  getProductsByCategory,
  getSubcategoryByCategory
} from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';

async function page({ searchParams }: { searchParams: { _id: string } }) {
  const data = await getProductsByCategory(searchParams?._id);
  const subcategories = await getSubcategoryByCategory(searchParams?._id);

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto="Home / Produtos" />
      <Produtos
        data={data}
        categoryId={searchParams?._id}
        subcategorieDataSlide={subcategories}
      />
    </div>
  );
}

export default page;
