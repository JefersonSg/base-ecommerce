import {
  getAllComments,
  getCategoryById,
  getSubcategoryById
} from '@/src/shared/api/GETS';
import {
  type CommentInterface,
  type ProductApi
} from '@/src/shared/helpers/interfaces';
import ContainerProduct from './Container_product';
import { Titulo } from '../../compartilhado/textos/Titulo';
import styles from './Produto.module.css';
import { Suspense } from 'react';
import Loading from '@/src/app/(loja)/produtos/produto/[id]/loading';

export default async function ContainerFetchs({
  productData
}: {
  productData: ProductApi;
}) {
  const commentData: { comments: CommentInterface[] } = await getAllComments(
    productData._id
  );
  const categoryName =
    productData.category && (await getCategoryById(productData?.category));
  const subcategoryName =
    productData.subcategory &&
    (await getSubcategoryById(productData?.subcategory));

  return (
    <main className={styles.section_produtos}>
      <Suspense fallback={<Loading />}>
        {productData ? (
          <ContainerProduct
            commentData={commentData}
            productData={productData}
            categoryName={categoryName?.category?.name}
            subcategoryName={subcategoryName?.subcategory?.name}
          />
        ) : (
          <div className={styles.not_found}>
            <Titulo titulo="Nenhum produto encontrado" />
          </div>
        )}
      </Suspense>
    </main>
  );
}
