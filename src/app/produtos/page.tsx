import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import styles from './page.module.css';

function page() {
  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto="Home / Produtos" />
    </div>
  );
}

export default page;
