import ContainerProduct from '@/src/components/loja/product-view/Container_product';
import {
  getCategoryById,
  getProductById,
  getSubcategoryById
} from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import styles from './Produto.module.css';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';

interface Props {
  _id: string;
}

const page = async ({ searchParams }: { searchParams: Props }) => {
  const product: { product: ProductApi } = await getProductById(
    searchParams?._id
  );
  const categoryName = await getCategoryById(product?.product?.category);
  const subcategoryName = await getSubcategoryById(
    product?.product?.subcategory
  );

  return (
    <div className={styles.section_produtos}>
      {product?.product ? (
        <ContainerProduct
          data={product}
          categoryName={categoryName?.category?.name}
          subcategoryName={subcategoryName?.subcategory?.name}
        />
      ) : (
        <div className={styles.not_found}>
          <Titulo titulo="Nenhum produto encontrado" />
        </div>
      )}
    </div>
  );
};

export default page;
