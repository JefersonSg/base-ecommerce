import React from 'react';
import styles from './HeaderPagamento.module.css';
import Image from 'next/image';
import BreadcrumbFinalizar from './breadcrumb/Breadcrumb_finalizar';

const HeaderPagamento = () => {
  return (
    <div className={styles.container_header_pagamento}>
      <div className={styles.wrapper_header}>
        <Image
          className={styles.logo}
          alt="Logo da loja"
          src={'/header/logo2.svg'}
          width={130}
          height={94}
        />

        <BreadcrumbFinalizar />
        <div className={styles.texto_segurança}>
          <Image
            alt="Imagem de cadeado"
            src={'/pagamento/cadeado.svg'}
            width={20}
            height={26}
          />
          <p>COMPRA SEGURA</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderPagamento;
