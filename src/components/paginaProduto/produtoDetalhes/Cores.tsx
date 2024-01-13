'use client';

import React from 'react';
import { Texto } from '../../textos/Texto';
import styles from './Cores.module.css';
import Image from 'next/image';

function Cores() {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div
      className={styles.cores}
      onClick={() => {
        setAtivo(!ativo);
      }}
    >
      <Texto texto="Cor" />
      <div className={styles.selectColor}>
        <div className={styles.corSelecionada}></div>
        <Image
          className={`${ativo ? styles.ativo : ''} ${styles.seta}`}
          alt="Seta"
          src={'/setaBaixo.svg'}
          width={9}
          height={9}
        />
      </div>
    </div>
  );
}

export default Cores;
