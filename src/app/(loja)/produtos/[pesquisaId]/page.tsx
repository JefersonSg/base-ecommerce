import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import styles from './page.module.css';
import Produtos from '@/src/components/loja/produtos/Produtos';

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
