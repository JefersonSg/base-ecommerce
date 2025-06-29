'use client';

import React from 'react';
import styles from './BotaoQuantidadeFinalizar.module.css';
import Image from 'next/image';

const BotaoQuantidadeFinalizar = ({
  contador,
  functionUpdate,
  isLoading
}: {
  contador: number;
  functionUpdate: (number: number) => Promise<any>;
  isLoading: boolean;
}) => {
  return (
    <button
      className={`${styles.botao_quantidade} ${
        isLoading ? styles.loading : ''
      }`}
    >
      <Image
        onClick={() => {
          void functionUpdate(-1);
        }}
        alt="Simbolo de subtração"
        src={'/carrinho/finalizar/subtracao.svg'}
        width={11}
        height={11}
        unoptimized
      />
      {contador}
      <Image
        onClick={() => {
          void functionUpdate(+1);
        }}
        alt="Simbolo de adição"
        src={'/carrinho/finalizar/adicao.svg'}
        width={11}
        height={11}
        unoptimized
      />
    </button>
  );
};

export default BotaoQuantidadeFinalizar;
