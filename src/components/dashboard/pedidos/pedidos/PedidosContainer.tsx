import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import PedidoCard from './Pedido-card';
import styles from './pedido-container.module.css';

const PedidosContainer = ({
  data
}: {
  data: { pedidos: OrderInterface[] };
}) => {
  return (
    <div className={styles.order_table}>
      {data.pedidos.map((item) => {
        return <PedidoCard key={item._id} orderData={item} />;
      })}
    </div>
  );
};

export default PedidosContainer;
