import { getOrderByUserId, getUserByToken } from '@/src/shared/api/GETS';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { cookies } from 'next/headers';
import PedidosContainer from './PedidosContainer';
import styles from './pedido-container.module.css';
import HeaderPedidos from './item/HeaderPedidos';

export default async function PedidosFetchDashboard() {
  const token = cookies().get('auth_token')?.value;
  const user = (await getUserByToken(token)) as UserInterface;
  const data = user.user && (await getOrderByUserId(user?.user?._id));

  return (
    <main className={styles.pedidos_container}>
      <HeaderPedidos />
      <PedidosContainer data={data} />
    </main>
  );
}
