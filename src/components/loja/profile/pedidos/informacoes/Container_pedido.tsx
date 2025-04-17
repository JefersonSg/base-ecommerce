'use client';
import React from 'react';
import styles from './ContainerPedido.module.css';
import Detalhes from './detalhes/Detalhes';
import { StatusPedido } from './status/StatusPedido';
import Pedido from './pedido/Pedido';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/src/shared/api/GETS';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import Breadcrumb from '../../../breadcrumb/Breadcrumb';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import Link from 'next/link';

const ContainerPedido = ({ orderId }: { orderId: string }) => {
  const { data } = useQuery<{ pedido: OrderInterface }>({
    queryKey: ['order-id-' + orderId],
    queryFn: async () => {
      if (orderId) {
        return await getOrderById(orderId);
      }
      return [];
    }
  });

  const [dataTime, setDataTime] = React.useState('');

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

  return (
    <div className={styles.pedido_container}>
      <Breadcrumb
        texto1="Minha conta"
        link1="/minha-conta"
        texto2="Pedidos"
        link2="/minha-conta/pedidos"
        texto3="pedido"
      />
      <Titulo titulo={`Voltar`} />
      <h1 className={styles.titulo}>Pedido #{data?.pedido?._id}</h1>
      <time>
        <div className={styles.data_pedido}>{dataTime}</div>
        <div>
          <p
            className={`${styles.status_pedido} ${
              data?.pedido ? styles[data?.pedido?.status] : ''
            }`}
          >
            Pedido {data?.pedido?.status}
          </p>
          {data?.pedido?.status === 'pendente' ? (
            <Link href={data.pedido.paymentLink}>Retomar pagamento</Link>
          ) : (
            ''
          )}
        </div>
      </time>
      <Detalhes
        address={data?.pedido?.address?.[0]}
        discount={data?.pedido?.discount}
        formaPagamento={data?.pedido?.methodPayment}
        valorTotal={data?.pedido?.totalPayment ? data?.pedido?.totalPayment : 0}
        valorEntrega={
          data?.pedido?.shippingValue ? data?.pedido?.shippingValue : 0
        }
      />
      <StatusPedido status={data?.pedido ? data?.pedido?.status : ''} />
      {data?.pedido && <Pedido orderData={data?.pedido} />}
    </div>
  );
};

export default ContainerPedido;
