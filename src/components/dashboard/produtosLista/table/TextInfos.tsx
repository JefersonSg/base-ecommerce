import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = () => {
  return (
    <div className={styles.textInfos_container}>
      <div className={styles.categoria}>
        <h3>PRODUTOS</h3>
      </div>
      <div className={styles.total_products_register}>
        <h3>TOTAL DE PRODUTOS</h3>
      </div>
      <div className={styles.total_products_value}>
        <h3>VALOR EM PRODUTOS</h3>
      </div>
      <div className={styles.actions}>
        <h3>AÇÕES</h3>
      </div>
    </div>
  );
};

export default TextInfos;
