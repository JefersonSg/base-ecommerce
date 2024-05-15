'use client';

import React from 'react';
import styles from './Cards.module.css';
import { useQuery } from '@tanstack/react-query';
import { getConfirmedOrders } from '@/src/shared/api/GETS';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import Image from 'next/image';

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
      <h3>
        Vendas nos ultimos 30 dias{' '}
        <Image
          alt="imagem ilustrativa"
          src={'/dashboard/home/titulos/bag.svg'}
          width={13}
          height={14}
        />
      </h3>
      <div className={styles.infos_card}>
        <div className={styles.container1}>
          <p>Total vendido</p>
          <p className={styles.valor_principal}>
            R$ {totalVendido ? convertNumberInReal(+totalVendido) : '0,00'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardVendas;
