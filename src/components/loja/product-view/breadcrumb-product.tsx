import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import categoryByIdGet from '@/src/actions/category-by-id-get';
import SubcategoriesByIdGet from '@/src/actions/subcategory-by-id-get';

const BreadcrumbProduct = async ({
  categoryId,
  subcategoryId,
  productName
}: {
  categoryId: string;
  subcategoryId?: string;
  productName: string;
}) => {
  const categoryName =
    categoryId && (await categoryByIdGet({ id: categoryId }));
  const subcategoryName =
    subcategoryId && (await SubcategoriesByIdGet({ id: subcategoryId }));

  return (
    <>
      <Breadcrumb
        texto1={categoryName ? categoryName.category.name : ''}
        link1={categoryId ? `/produtos/categoria?_id=${categoryId}` : ''}
        texto2={subcategoryName ? subcategoryName?.subcategory?.name : ''}
        link2={
          subcategoryId ? `/produtos/subcategoria?_id=${subcategoryId}` : ''
        }
        texto3={productName}
      />
    </>
  );
};

export default BreadcrumbProduct;
