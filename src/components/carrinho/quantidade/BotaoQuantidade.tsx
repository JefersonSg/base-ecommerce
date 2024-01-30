'use client';

import React from 'react';
import styles from './BotaoQuantidade.module.css';
import Image from 'next/image';

const BotaoQuantidade = ({
  contador,
  setContador,
}: {
  contador: number;
  setContador: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <button className={styles.botao_quantidade}>
      <Image
        onClick={() => {
          if (contador > 1) {
            setContador(contador - 1);
          }
        }}
        alt="Simbolo de subtração"
        src={'/carrinho/subtracao.svg'}
        width={11}
        height={11}
      />
      {contador}
      <Image
        onClick={() => {
          setContador(contador + 1);
        }}
        alt="Simbolo de adição"
        src={'/carrinho/adicao.svg'}
        width={11}
        height={11}
      />
    </button>
  );
};

export default BotaoQuantidade;
