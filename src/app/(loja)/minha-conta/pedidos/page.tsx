import styles from './styles.module.css';
import PedidosFetch from '@/src/components/loja/profile/pedidos/PedidosFetch';

export default async function PedidosPage() {
  return (
    <main className={styles.pedidos_container}>
      <PedidosFetch />
    </main>
  );
}
