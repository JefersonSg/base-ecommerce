'use client';

import React from 'react';
import styles from './Tamanhos.module.css';

function Tamanhos({ size }: { size: string }) {
  return (
    <div className={styles.tamanhos_container}>
      <span className={styles.span_tamanho}>Tamanhos:</span>
      <div className={styles.tamanhos}>
        <p className="texto">{size}</p>
      </div>
    </div>
  );
}

export default Tamanhos;
