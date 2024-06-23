import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './categoria.module.css';
import {
  getCategoryById,
  getSubcategoryByCategory
} from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import { Suspense } from 'react';
import productsByCategoryGet from '@/src/actions/products-by-category-get ';

async function page({ searchParams }: { searchParams: { _id: string } }) {
  const data = await productsByCategoryGet({ id: searchParams?._id });
  const category: { category: CategoryInterface } = await getCategoryById(
    searchParams._id
  );
  const subcategories = await getSubcategoryByCategory(searchParams?._id);

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1={category?.category?.name} />
      <Suspense>
        <Produtos
          data={data?.products}
          functionGetProduct={productsByCategoryGet}
          categoryId={searchParams?._id}
          subcategorieDataSlide={subcategories}
        />
      </Suspense>
    </div>
  );
}

export default page;
