import dynamic from 'next/dynamic';
import styles from './Produto.module.css';

function produto() {
  const ContainerProduct = dynamic(
    async () =>
      await import('@/src/components/loja/Produto_view/Container_product'),
    {
      ssr: true
    }
  );
  return (
    <div className={styles.section_produtos}>
      <ContainerProduct />
    </div>
  );
}

export default produto;
