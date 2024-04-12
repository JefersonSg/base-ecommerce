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

export default async function ContainerFetchs({
  productId,
  productData
}: {
  productId: string;
  productData: ProductApi;
}) {
  const commentData: { comments: CommentInterface[] } = await getAllComments(
    productData._id
  );
  const categoryName = await getCategoryById(productData?.category);
  const subcategoryName = await getSubcategoryById(productData?.subcategory);

  return (
    <main className={styles.section_produtos}>
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
    </main>
  );
}
