import { type ProductApi } from '@/src/shared/helpers/interfaces';
import ContainerProduct from './Container_product';
import { Titulo } from '../../compartilhado/textos/Titulo';
import styles from './Produto.module.css';
import productByIdGet from '@/src/actions/product-by-id-get';

export default async function ContainerFetchs({ id }: { id: string }) {
  const productData: { product: ProductApi } | undefined = await productByIdGet(
    { id }
  );

  return (
    <main className={styles.section_produtos}>
      {productData?.product ? (
        <ContainerProduct productData={productData?.product} />
      ) : (
        <div className={styles.not_found}>
          <Titulo titulo="Nenhum produto encontrado" />
        </div>
      )}
    </main>
  );
}
