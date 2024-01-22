import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/produtos/Produtos';

function page({ params }: { params: { pesquisaId: string } }) {
  return (
    <div className={styles.produtos_container}>
      <Breadcrumb
        texto={`Home / Produtos / ${params.pesquisaId.replaceAll('%20', ' ')}`}
      />
      <Produtos title={params.pesquisaId.replaceAll('%20', ' ')} />
    </div>
  );
}

export default page;
