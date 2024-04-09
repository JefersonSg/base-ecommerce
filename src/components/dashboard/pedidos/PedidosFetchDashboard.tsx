'use client';

import { getAllOrders } from '@/src/shared/api/GETS';
import PedidosContainer from './PedidosContainer';
import styles from './pedido-container.module.css';
import HeaderPedidos from './item/HeaderPedidos';
import { useQuery } from '@tanstack/react-query';

export default function PedidosFetchDashboard() {
  const { data, refetch } = useQuery({
    queryKey: ['all-orders'],
    queryFn: getAllOrders
  });

  return (
    <main className={styles.pedidos_container}>
      <HeaderPedidos data={data} />
      <PedidosContainer data={data} refetchData={refetch} />
    </main>
  );
}
