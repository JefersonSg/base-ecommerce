'use client';

import React from 'react';
import styles from './PopupInfos.module.css';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import Image from 'next/image';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import Link from 'next/link';

const PopupInfos = ({
  imageUser,
  setAtivoPopUp,
  data
}: {
  imageUser: string;
  setAtivoPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  data: OrderInterface;
}) => {
  const [dataTime, setDataTime] = React.useState('');

  React.useEffect(() => {
    const timestamp = data.createdAt;
    const newData = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    const dataFormatada = newData.toLocaleString('pt-BR', options);

    setDataTime(dataFormatada);
  }, [data]);

  return (
    <div className={styles.PopupInfos}>
      <h1>Detalhes do pedido</h1>
      <div className={styles.id_pedido}>
        <p>Id do pedido:</p>
        <Link href={`/dashboard/pedidos/${data._id}`}>#{data._id}</Link>
      </div>
      <div>
        <p>Data:</p>
        <span className={`${styles.data_pedido} ${styles.texto_estilo_2}`}>
          {dataTime}
        </span>
      </div>
      <div>
        <p>Cliente:</p>
        <div className={styles.cliente_pedido}>
          <div className={styles.imagemPerfil}>
            <Image
              alt="Foto de perfil do clente"
              src={`${imageUser ?? '/profile/profile.svg'}`}
              fill={true}
            />
          </div>
          <div>
            <p className={`${styles.name} ${styles.texto_estilo_1}`}>
              {data?.address?.[0]?.nome}
            </p>
            <p className={`${styles.email} ${styles.texto_estilo_2}`}>
              {data?.address?.[0]?.email}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p>Pagamento:</p>
        <div
          className={`${styles.status_pagamento_pedido} ${
            styles.texto_estilo_1
          } ${styles[data.status]}`}
        >
          <div>
            <span className={`${styles.bolinha} ${styles[data.status]}`}></span>
            {data.status === 'pendente'
              ? 'Pendente'
              : data.status === 'cancelado'
                ? 'Cancelado'
                : 'Confirmado'}
          </div>
        </div>
      </div>{' '}
      <div className={`${styles.valor_pedido} `}>
        <p>Valor do pedido: </p>
        <span>R$ {convertNumberInReal(data?.totalPayment)}</span>
      </div>
      <div>
        <p>Status:</p>
        <div className={`${styles.status_pedido} ${styles[data.status]}`}>
          {data.status}
        </div>
      </div>
      <div>
        <p>Metodo:</p>
        <span className={styles.metodo_pagamento_pedido}>
          {data.methodPayment}
        </span>
      </div>
      <button>Ver mais</button>
    </div>
  );
};

export default PopupInfos;
