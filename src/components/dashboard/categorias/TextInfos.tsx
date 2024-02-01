import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = () => {
  return (
    <div className={styles.textInfos_container}>
      <div></div>
      <div className={styles.categoria}>CATEGORIAS</div>
      <div className={styles.total_products_register}>TOTAL DE PRODUTOS</div>
    </div>
  );
};

export default TextInfos;
