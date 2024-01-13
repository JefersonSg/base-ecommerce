'use client';

import React from 'react';
import { Texto } from '../../textos/Texto';
import styles from './Tamanhos.module.css';
import Image from 'next/image';
import { TextoIndicativo } from '../../textos/TextoIndicativo';

function Tamanhos() {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div
      className={styles.tamanhos}
      onClick={() => {
        setAtivo(!ativo);
      }}
    >
      <Texto texto="300ml" />
      <div className={styles.selectSize}>
        <Image
          className={`${ativo ? styles.ativo : ''} ${styles.seta}`}
          alt="Seta"
          src={'/setaBaixo.svg'}
          width={9}
          height={9}
        />
      </div>
      <TextoIndicativo texto="Escolha o tamanho" />
    </div>
  );
}

export default Tamanhos;
