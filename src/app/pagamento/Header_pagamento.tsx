import React from 'react';
import styles from './HeaderPagamento.module.css';
import Image from 'next/image';
import BreadcrumbFinalizar from '@/src/components/finalizar/breadcrumb/Breadcrumb_finalizar';
import Link from 'next/link';

const HeaderPagamento = () => {
  return (
    <div className={styles.container_header_pagamento}>
      <div className={styles.wrapper_header}>
        <Link href={'/'}>
          <Image
            className={styles.logo}
            alt="Logo da loja"
            src={'/header/Logo.svg'}
            width={130}
            height={94}
            unoptimized
          />
        </Link>

        <BreadcrumbFinalizar />
        <div className={styles.texto_segurança}>
          <Image
            alt="Imagem de cadeado"
            src={'/pagamento/cadeado.svg'}
            width={20}
            height={20}
            unoptimized
          />
          <div className={styles.pagamento_seguro}>
            <p>PAGAMENTO</p>
            <span>100% SEGURO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPagamento;
