'use client';

import React from 'react';
import styles from './pedido.module.css';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import ProdutoInfos from './item/ProdutoInfos';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import Link from 'next/link';

const PedidoCard = ({ orderData }: { orderData: OrderInterface }) => {
  const [dataTime, setDataTime] = React.useState('');

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
    <div className={styles.pedido_card}>
      <div className={styles.orderHeader}>
        <div>
          <p className={styles.data_titulo}>DATA DO PEDIDO</p>
          <span className={styles.data}>{dataTime}</span>
          <span className={styles.id_pedido}>#{orderData._id}</span>
        </div>
        <div className={styles.total_pedido}>
          <p>Total do pedido</p>
          <span>R$ {convertNumberInReal(orderData.totalPayment)}</span>
        </div>
        <span className={`${styles.status_pedido} ${styles[orderData.status]}`}>
          Pedido {orderData.status}
        </span>
      </div>
      <div className={styles.bodyOrder}>
        {orderData.productIds.map(
          (productId, index) =>
            index < 3 && (
              <ProdutoInfos
                key={index}
                productId={productId}
                quantidade={orderData.productAmounts[index]}
                valorPago={orderData.valueProducts[index]}
              />
            )
        )}
      </div>
      <Link href={`/minha-conta/pedidos/${orderData._id}`}>
        <button className={styles.botao_ver_mais}>
          Ver detalhes do pedido
        </button>
      </Link>
    </div>
  );
};

export default PedidoCard;
