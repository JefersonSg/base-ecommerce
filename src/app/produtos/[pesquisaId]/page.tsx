import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/produtos/Produtos';

function page({ params }: { params: { pesquisaId: string } }) {
  const stringDecoded = decodeURIComponent(params.pesquisaId);

  return (
    <div className={styles.produtos_container}>
      <Breadcrumb texto={`Home / Produtos / pesquisa`} />
      <Produtos pesquisa={stringDecoded} />
    </div>
  );
}

export default page;
