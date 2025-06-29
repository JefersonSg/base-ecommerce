'use client';

import React from 'react';
import styles from './BotaoQuantidade.module.css';
import Image from 'next/image';

const BotaoQuantidade = ({
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
        src={'/carrinho/subtracao.svg'}
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
        src={'/carrinho/adicao.svg'}
        width={11}
        height={11}
        unoptimized
      />
    </button>
  );
};

export default BotaoQuantidade;
