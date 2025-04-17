import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './categoria.module.css';
import { getSubcategoryByCategory } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsFilterGet from '@/src/actions/products-filters-get';
import categoryByIdGet from '@/src/actions/category-by-id-get';

async function page({ searchParams }: { searchParams: { _id: string } }) {
  const data = await productsFilterGet({
    active: true,
    category: searchParams?._id
  });
  const category = await categoryByIdGet({
    id: searchParams._id
  });
  const subcategories = await getSubcategoryByCategory(searchParams?._id);

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1={category?.category?.name ?? ''} />
      <Suspense>
        <Produtos
          data={data?.products}
          functionGetProduct={productsFilterGet}
          categoryId={searchParams?._id}
          subcategorieDataSlide={subcategories}
          active={true}
        />
      </Suspense>
    </div>
  );
}

export default page;
