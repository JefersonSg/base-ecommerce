import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import {
  getCategoryById,
  getProductsBySubcategory,
  getSubcategoryByCategory,
  getSubcategoryById
} from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import {
  type subcategoryInterface,
  type ProductApi,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import { Suspense } from 'react';

async function page({ searchParams }: { searchParams: { _id: string } }) {
  const data: { products: ProductApi[] } = await getProductsBySubcategory(
    searchParams?._id
  );
  const subcategoria: { subcategory: subcategoryInterface } =
    await getSubcategoryById(searchParams._id);
  const category: { category: CategoryInterface } = await getCategoryById(
    subcategoria?.subcategory?.category
  );

  const subcategories = await getSubcategoryByCategory(
    subcategoria?.subcategory?.category
  );

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb
        texto1={category?.category?.name}
        link1={`/produtos/categoria?_id=${category.category._id}`}
        texto2={subcategoria.subcategory.name}
      />
      <Suspense>
        <Produtos data={data} subcategorieDataSlide={subcategories} />
      </Suspense>
    </div>
  );
}

export default page;
