'use client';

import React from 'react';
import styles from './EnvioInfos.module.css';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

const EnvioInfos = ({ pedido }: { pedido: OrderInterface }) => {
  return (
    <div className={`table ${styles.envio_infos}`}>
      <p className={styles.texto_estilo_1}>Envio escolhido</p>

      <div className={styles.endereco}>
        <div className={styles.pessoa}>
          <p>Empresa: {pedido.shippingCompany}</p>
          <p>Metodo escolhido: {pedido.shippingMethod}</p>
          <p>
            Valor da entrega: R$ {convertNumberInReal(pedido.shippingValue)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvioInfos;
