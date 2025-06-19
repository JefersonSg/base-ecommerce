'use client';

import styles from './Descricao.module.css';
import React from 'react';

function Descricao({
  description,
  title
}: {
  description: string;
  title: string;
}) {
  return (
    <div className={styles.descricao}>
      <div className={styles.texto}>
        <p className={'texto'}>{description}</p>
      </div>
    </div>
  );
}

export default Descricao;
