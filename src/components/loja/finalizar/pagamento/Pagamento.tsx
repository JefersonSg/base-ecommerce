'use client';
import React from 'react';
import styles from './Pagamento.module.css';
import Image from 'next/image';

const Pagamento = () => {
  return (
    <div className={styles.pagamento_container}>
      <h3>Forma de pagamento</h3>
      <div className={styles.formas_pagamento}>
        <div className={styles.metodo_pagamento}>
          <div className={styles.info}>
            <div className={styles.background_image}>
              <Image
                alt="Simbolo de cartão de crédito"
                src={'/carrinho/finalizar/cartao.svg'}
                width={21}
                height={13}
              />
            </div>
            Cartão
          </div>
          <span className={styles.select}></span>
        </div>
        <div className={styles.metodo_pagamento}>
          <div className={styles.info}>
            <div className={styles.background_image}>
              <Image
                alt="Simbolo do PIX"
                src={'/carrinho/finalizar/pix.svg'}
                width={14}
                height={14}
              />
            </div>
            PIX
          </div>
          <span className={styles.select}></span>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
