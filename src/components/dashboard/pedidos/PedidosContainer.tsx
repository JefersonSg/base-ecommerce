import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import PedidoCard from './item/Pedido-card';
import styles from './pedido-container.module.css';

const PedidosContainer = ({
  data
}: {
  data: { pedidos: OrderInterface[] };
}) => {
  return (
    <table className={styles.tabela_pedidos}>
      <thead className={styles.topo_tabela}>
        <tr>
          <th>ID</th>
          <th>DATA</th>
          <th>CLIENTES</th>
          <th>PAGAMENTO</th>
          <th>VALOR</th>
          <th>STATUS</th>
          <th>MÉTODO</th>
        </tr>
      </thead>
      <tbody>
        {data?.pedidos?.map((item) => {
          return <PedidoCard key={item._id} orderData={item} />;
        })}
      </tbody>
    </table>
  );
};

export default PedidosContainer;
