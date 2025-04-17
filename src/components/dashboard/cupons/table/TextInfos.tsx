import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = () => {
  return (
    <tr className={styles.textInfos_container}>
      <th className={styles.code_cupom}>CODE CUPONS</th>
      <th className={styles.total_usos}>USOS</th>
      <th className={styles.active}>ATIVO</th>
      <th className={styles.actions}>AÇÕES</th>
    </tr>
  );
};

export default TextInfos;
