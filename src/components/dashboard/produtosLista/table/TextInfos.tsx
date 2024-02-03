import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = () => {
  return (
    <div className={styles.textInfos_container}>
      <div className={styles.produto}>
        <h3>PRODUTO</h3>
      </div>
      <div className={styles.categoria}>
        <h3>CATEGORIA</h3>
      </div>
      <div className={styles.total_products_register}>
        <h3>ESTOQUE</h3>
      </div>
      <div className={styles.total_products_amount}>
        <h3>QUANTIDADE</h3>
      </div>
      <div className={styles.total_products_value}>
        <h3>PREÇO</h3>
      </div>
      <div className={styles.actions}>
        <h3>AÇÕES</h3>
      </div>
    </div>
  );
};

export default TextInfos;
