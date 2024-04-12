'use client';

import { getOrderById } from '@/src/shared/api/GETS';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styles from './PedidoDetalhes.module.css';
import TabelaProdutos from './tabela/TabelaProdutos';
import UsuarioInfos from './usuario/UsuarioInfos';

const PedidoDetalhesContainer = ({ orderId }: { orderId: string }) => {
  const { data } = useQuery<{ pedido: OrderInterface }>({
    queryKey: ['order-id-' + orderId],
    queryFn: async () => {
      if (orderId) {
        return await getOrderById(orderId);
      }
    }
  });

  const [dataTime, setDataTime] = React.useState('');
  //   const [ativoEdit, setAtivoEdit] = React.useState(false);

  React.useEffect(() => {
    const timestamp = data?.pedido?.createdAt;

    if (!timestamp) {
      return;
    }
    const newData = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };

    const dataFormatada = newData.toLocaleString('pt-BR', options);

    setDataTime(dataFormatada);
  }, [data]);
  if (!data?.pedido) {
    return;
  }
  return (
    <>
      <div className={styles.container_pedido}>
        <div className={styles.status_pedido}>
          <h3 className={styles.id_pedido}>Pedido #{data?.pedido?._id}</h3>
          <p className={styles[data?.pedido?.status]}>
            {data?.pedido?.status !== 'pendente' &&
            data?.pedido?.status !== 'cancelado'
              ? 'PAGO'
              : data?.pedido?.status?.toLocaleUpperCase()}
          </p>
          <p className={styles[data?.pedido?.status]}>
            {data?.pedido?.status?.toLocaleUpperCase()}
          </p>
        </div>
        <div className={styles.data}>{dataTime}</div>
        {/* <div className={styles.botoes}>
          <SepararPedido />
          <EnviarPedido />
          <ConfirmarPedido />
          <CancelarPedido />
        </div> */}
        <TabelaProdutos data={data?.pedido} />
        <UsuarioInfos
          userId={data?.pedido?.userId}
          address={data?.pedido?.address?.[0]}
        />
      </div>
    </>
  );
};

export default PedidoDetalhesContainer;
