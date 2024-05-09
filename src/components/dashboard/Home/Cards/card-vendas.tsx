'use client';

import React from 'react';
import styles from './Cards.module.css';
import { useQuery } from '@tanstack/react-query';
import { getConfirmedOrders } from '@/src/shared/api/GETS';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

const CardVendas = () => {
  const { data } = useQuery<{ pedidos: OrderInterface[] }>({
    queryKey: ['get-order-confirmed'],
    queryFn: getConfirmedOrders
  });

  const totalVendido = data?.pedidos?.reduce((cont, pedido: OrderInterface) => {
    return cont + +pedido.totalPayment;
  }, 0);

  return (
    <section className={styles.container_card}>
      <h3>Vendas nos ultimos 30 dias</h3>
      <div className={styles.infos_card}>
        <div className={styles.container1}>
          <p className={styles.valor_principal}>
            R$ {totalVendido ? convertNumberInReal(+totalVendido) : '0,00'}
          </p>
          <div className={styles.comparacao}>
            {/* <span>Graph</span> */}
            {/* <p>R$ 20.425,00</p> */}
          </div>
        </div>
        <div className={styles.container_graph}>GRAFICO</div>
      </div>
    </section>
  );
};

export default CardVendas;
