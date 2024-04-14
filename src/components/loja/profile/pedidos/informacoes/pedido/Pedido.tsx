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
        <Link href={orderData.orderTracking}>Link de rastreio</Link>
      </div>
      <Tabela data={orderData} />
    </div>
  );
};

export default Pedido;
