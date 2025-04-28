'use client';

import React from 'react';
import styles from './Cards.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders, getConfirmedOrders } from '@/src/shared/api/GETS';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import Image from 'next/image';
import Link from 'next/link';
import stylesVendas from './CardVendas.module.css';
import ButtonAdd from '../../Botoes/ButtonAdd';

const CardVendas = () => {
  const { data } = useQuery<{ pedidos: OrderInterface[] }>({
    queryKey: ['get-order-confirmed'],
    queryFn: getConfirmedOrders
  });
  const pedidos = useQuery<{ pedidos: OrderInterface[] }>({
    queryKey: ['get-all-orders'],
    queryFn: getAllOrders
  });

  const totalVendido = data?.pedidos?.reduce((cont, pedido: OrderInterface) => {
    return cont + +pedido.totalPayment;
  }, 0);

  return (
    <Link href={'/dashboard/pedidos'} className={styles.container_card}>
      <h3>
        Métricas de negócio <span>{`( Últimos 30 Dias )`}</span>{' '}
        <Image
          alt="imagem ilustrativa"
          src={'/dashboard/home/titulos/bag.svg'}
          width={13}
          height={14}
        />
      </h3>
      <div className={`${stylesVendas.card_vendas}`}>
        <div className={stylesVendas.container1}>
          <p>Vendas brutas</p>
          <p className={stylesVendas.valor_principal}>
            R$ {totalVendido ? convertNumberInReal(+totalVendido) : '0,00'}
          </p>
        </div>
        <div className={stylesVendas.container1}>
          <p>Quantidade de vendas</p>
          <p className={stylesVendas.valor_principal}>
            {pedidos.data?.pedidos ? pedidos?.data?.pedidos?.length : 0}
          </p>
        </div>
      </div>
      <div className={stylesVendas.div_btn}>
        <ButtonAdd text="ver vendas" />
      </div>
    </Link>
  );
};

export default CardVendas;
