'use client';

import React from 'react';
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
      <p className="texto">Cor</p>
      <div className={styles.select_color}>
        <div className={styles.cor_selecionada}></div>
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
