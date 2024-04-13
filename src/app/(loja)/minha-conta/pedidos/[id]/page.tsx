import { type PageParams } from '@/src/components/loja/product-view/avaliacoes/comentarios/Comentarios';
import styles from './PedidosId.module.css';
import ContainerPedido from '@/src/components/loja/profile/pedidos/informacoes/Container_pedido';

export default async function Page({ params }: { params: PageParams }) {
  return (
    <main className={styles.container_pedido}>
      <ContainerPedido orderId={params.id} />
    </main>
  );
}
