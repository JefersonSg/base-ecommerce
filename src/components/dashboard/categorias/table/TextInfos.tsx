import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = () => {
  return (
    <tr className={styles.textInfos_container}>
      <th className={styles.categoria}>
        <h3>CATEGORIAS</h3>
      </th>
      <th className={styles.total_products_register}>
        <h3>TOTAL DE PRODUTOS</h3>
      </th>
      <th className={styles.total_products_value}>
        <h3>VALOR EM PRODUTOS</h3>
      </th>
      <th className={styles.actions}>
        <h3>AÇÕES</h3>
      </th>
    </tr>
  );
};

export default TextInfos;
