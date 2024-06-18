import {
  getCategoryById,
  getProductById,
  getSubcategoryById
} from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import ContainerProduct from './Container_product';
import { Titulo } from '../../compartilhado/textos/Titulo';
import styles from './Produto.module.css';

export default async function ContainerFetchs({ id }: { id: string }) {
  const productData: { product: ProductApi } = await getProductById(id);

  const categoryName =
    productData?.product.category &&
    (await getCategoryById(productData?.product?.category));
  const subcategoryName =
    productData?.product.subcategory &&
    (await getSubcategoryById(productData?.product?.subcategory));

  return (
    <main className={styles.section_produtos}>
      {productData?.product ? (
        <ContainerProduct
          productData={productData?.product}
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
