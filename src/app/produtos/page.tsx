import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/produtos/Produtos';

function page() {
  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto="Home / Produtos" />
      <Produtos />
    </div>
  );
}

export default page;
