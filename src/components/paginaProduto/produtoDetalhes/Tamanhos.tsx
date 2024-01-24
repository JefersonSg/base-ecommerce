'use client';

import React from 'react';
import styles from './Tamanhos.module.css';
import Image from 'next/image';

function Tamanhos() {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div
      className={styles.tamanhos}
      onClick={() => {
        setAtivo(!ativo);
      }}
    >
      <p className="texto">300ml</p>
      <div className={styles.select_size}>
        <Image
          className={`${ativo ? styles.ativo : ''} ${styles.seta}`}
          alt="Seta"
          src={'/setaBaixo.svg'}
          width={9}
          height={9}
        />
      </div>
      <p className="texto_indicativo">Escolha o tamanho</p>
    </div>
  );
}

export default Tamanhos;
