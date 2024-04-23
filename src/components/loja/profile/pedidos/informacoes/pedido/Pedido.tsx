'use client';

import React from 'react';
import styles from './pedido.module.css';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import Tabela from './Tabela';
import Link from 'next/link';

const Pedido = ({ orderData }: { orderData: OrderInterface }) => {
  return (
    <div className={styles.pedido_container}>
      <div className={styles.cabeçalho}>
        <h3>Pacote</h3>
        <p className={styles.empresa_entrega}>{orderData.shippingCompany}</p>
        <Link
          href={orderData.orderTracking}
          onClick={(e) => {
            if (!orderData.orderTracking) {
              e.preventDefault();
            }
          }}
        >
          Link de rastreio
        </Link>
      </div>
      <Tabela data={orderData} />
    </div>
  );
};

export default Pedido;
