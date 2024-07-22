'use client';
import React from 'react';
import styles from './Pagamento.module.css';
import Image from 'next/image';

const Pagamento = ({
  methodPayment,
  setMethodPayment
}: {
  methodPayment: string;
  setMethodPayment: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.pagamento_container}>
      <h3>Pagamento</h3>
      <div className={styles.formas_pagamento}>
        <div
          className={styles.metodo_pagamento}
          onClick={() => {
            setMethodPayment('card');
          }}
        >
          <div className={styles.info}>
            <div
              className={`${styles.background_image} ${
                methodPayment === 'card' ? styles.selected : ''
              }`}
            >
              <Image
                alt="Simbolo de cartão de crédito"
                src={'/carrinho/finalizar/cartao.svg'}
                width={30}
                height={21}
              />
            </div>
          </div>
        </div>
        <div
          className={styles.metodo_pagamento}
          onClick={() => {
            setMethodPayment('pix');
          }}
        >
          <div className={styles.info}>
            <div
              className={`${methodPayment === 'pix' ? styles.selected : ''} ${
                styles.background_image
              }`}
            >
              <Image
                alt="Simbolo do PIX"
                src={'/carrinho/finalizar/pix_2.svg'}
                width={63}
                height={22}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
