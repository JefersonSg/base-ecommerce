import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import { getSubcategoryByCategory } from '@/src/shared/api/GETS';
import Produtos from '@/src/components/loja/produtos/Produtos';
import { Suspense } from 'react';
import productsFilterGet from '@/src/actions/products-filters-get';
import categoryByIdGet from '@/src/actions/category-by-id-get';
import SubcategoriesByIdGet from '@/src/actions/subcategory-by-id-get';

async function page({ searchParams }: { searchParams: { _id: string } }) {
  const data = await productsFilterGet({
    subcategory: searchParams?._id,
    active: true
  });
  const subcategoria = await SubcategoriesByIdGet({ id: searchParams._id });
  const category =
    subcategoria?.subcategory &&
    (await categoryByIdGet({
      id: subcategoria?.subcategory?.category
    }));

  const subcategories =
    subcategoria?.subcategory &&
    (await getSubcategoryByCategory(subcategoria?.subcategory?.category));

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb
        texto1={category?.category?.name ?? ''}
        link1={`/produtos/categoria?_id=${category?.category?._id}`}
        texto2={subcategoria?.subcategory?.name}
      />
      <Suspense>
        <Produtos
          functionGetProduct={productsFilterGet}
          data={data?.products}
          subcategorieDataSlide={subcategories}
          active={true}
          subcategoryId={searchParams?._id}
        />
      </Suspense>
    </div>
  );
}

export default page;
