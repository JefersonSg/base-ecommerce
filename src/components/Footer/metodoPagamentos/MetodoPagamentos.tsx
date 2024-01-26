import Image from 'next/image';
import styles from './MetodoPagametos.module.css';

export function MetodoPagamentos({ img }: { img: string[] }) {
  return (
    <div className={styles.div_metodos_pagamentos}>
      {img.map((image) => {
        return (
          <Image
            key={image}
            alt={image}
            src={`footer/MetodosPagamentos/${image}.svg`}
            width={66}
            height={21}
          />
        );
      })}
    </div>
  );
}
