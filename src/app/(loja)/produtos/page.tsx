import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/loja/produtos/Produtos';
import productsFilterGet from '@/src/actions/products-filters-get';

async function Page() {
  const data = await productsFilterGet({ active: true });
  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto1="Produtos" />
      <Produtos
        data={data?.products}
        functionGetProduct={productsFilterGet}
        active={true}
      />
    </div>
  );
}

export default Page;
