import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = () => {
  return (
    <tr className={styles.textInfos_container}>
      <th className={styles.produto}>PRODUTO</th>

      {/* <th className={styles.categoria}>
          CATEGORIA
        </th> */}

      <th className={styles.total_products_register}>ESTOQUE</th>
      <th className={styles.total_products_amount}>QUANTIDADE</th>
      <th className={styles.total_products_value}>PREÇO</th>
      <th className={styles.actions}>AÇÕES</th>
    </tr>
  );
};

export default TextInfos;
