'use client';

import React from 'react';
import styles from './pedido.module.css';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import ProdutoInfos from './item/ProdutoInfos';

const PedidoCard = ({ orderData }: { orderData: OrderInterface }) => {
  const [dataTime, setDataTime] = React.useState('');
  const [valorTotal, setValorTotal] = React.useState('');

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

  React.useEffect(() => {
    async function setValorCategory() {
      const valorTotalArray = orderData?.totalPayment;

      if (valorTotalArray && valorTotalArray > 0) {
        const formatoNumero = new Intl.NumberFormat('pt-BR');
        const numeroFormatado = formatoNumero.format(valorTotalArray);

        setValorTotal(numeroFormatado);
      }
    }
    void setValorCategory();
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
          <span>
            R${' '}
            {valorTotal?.split(',')?.[0]
              ? valorTotal?.split(',')?.[0] + ','
              : '0,'}{' '}
            {valorTotal?.split(',')?.[1]
              ? valorTotal?.split(',')?.[1].length > 1
                ? valorTotal?.split(',')?.[1]
                : valorTotal?.split(',')?.[1] + '0'
              : '00'}
          </span>
        </div>
        <span className={`${styles.status_pedido} ${styles[orderData.status]}`}>
          Pedido {orderData.status}
        </span>
      </div>
      <div className={styles.bodyOrder}>
        {orderData.productIds.map(
          (productId, index) =>
            index < 3 && <ProdutoInfos key={productId} productId={productId} />
        )}
      </div>
      <button className={styles.botao_ver_mais}>Ver detalhes do pedido</button>
    </div>
  );
};

export default PedidoCard;
