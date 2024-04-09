'use client';

import React from 'react';
import styles from './pedido.module.css';
import {
  type UserInterface,
  type OrderInterface
} from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/src/shared/api/GETS';
import Link from 'next/link';
import VerMais from '@/src/components/compartilhado/botoes/VerMais';

const PedidoCard = ({
  orderData,
  setAtivoPopUp,
  setInfosPopUp,
  setImageUser
}: {
  orderData: OrderInterface;
  setAtivoPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUser: React.Dispatch<React.SetStateAction<string>>;
  setInfosPopUp: React.Dispatch<
    React.SetStateAction<OrderInterface | undefined>
  >;
}) => {
  const [dataTime, setDataTime] = React.useState('');

  const { data } = useQuery<UserInterface>({
    queryKey: ['user' + orderData._id],
    queryFn: async () => {
      return await getUserById(orderData?.address?.[0]?.userId);
    }
  });
  React.useEffect(() => {
    const timestamp = orderData.createdAt;
    const data = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    const dataFormatada = data.toLocaleString('pt-BR', options);

    setDataTime(dataFormatada);
  }, [orderData]);

  return (
    <tr className={styles.pedido_card}>
      <td
        className={styles.ver_mais}
        onClick={() => {
          setAtivoPopUp(true);
          setInfosPopUp(orderData);
          setImageUser(data?.user?.image);
        }}
      >
        <VerMais />
      </td>
      <td className={`${styles.id_pedido}`}>
        <Link href={`/dashboard/pedidos/${orderData._id}`}>
          #{orderData._id}
        </Link>
      </td>
      <td className={`${styles.data_pedido} ${styles.texto_estilo_2}`}>
        {dataTime}
      </td>
      <td className={styles.td_cliente}>
        <div className={styles.cliente_pedido}>
          <div className={styles.imagemPerfil}>
            <Image
              alt="Foto de perfil do clente"
              src={`${data?.user.image ?? '/profile/profile.svg'}`}
              fill={true}
            />
          </div>
          <div>
            <p className={`${styles.name} ${styles.texto_estilo_1}`}>
              {orderData?.address?.[0]?.nome}
            </p>
            <p className={`${styles.email} ${styles.texto_estilo_2}`}>
              {orderData?.address?.[0]?.email}
            </p>
          </div>
        </div>
      </td>
      <td
        className={`${styles.status_pagamento_pedido} ${
          styles.texto_estilo_1
        } ${styles[orderData.status]}`}
      >
        <div>
          <span
            className={`${styles.bolinha} ${styles[orderData.status]}`}
          ></span>
          {orderData.status === 'pendente'
            ? 'Pendente'
            : orderData.status === 'cancelado'
              ? 'Cancelado'
              : 'Confirmado'}
        </div>
      </td>
      <td className={`${styles.valor_pedido}`}>
        R$ {convertNumberInReal(orderData?.totalPayment)}
      </td>
      <td>
        <div className={`${styles.status_pedido} ${styles[orderData.status]}`}>
          {orderData.status}
        </div>
      </td>
      <td className={styles.metodo_pagamento_pedido}>
        {orderData.methodPayment}
      </td>
    </tr>
  );
};

export default PedidoCard;
