import {
  getAllComments,
  getCategoryById,
  getProductById,
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
  productId
}: {
  productId: string;
}) {
  const product: { product: ProductApi } = await getProductById(productId);
  const commentData: { comments: CommentInterface[] } =
    await getAllComments(productId);
  const categoryName = await getCategoryById(product?.product?.category);
  const subcategoryName = await getSubcategoryById(
    product?.product?.subcategory
  );

  return (
    <main className={styles.section_produtos}>
      {product?.product ? (
        <ContainerProduct
          commentData={commentData}
          data={product}
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
