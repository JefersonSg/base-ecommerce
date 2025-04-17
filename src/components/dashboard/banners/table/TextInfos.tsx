import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = () => {
  return (
    <div className={styles.textInfos_container}>
      <div className={styles.categoria}>
        <h3>BANNERS</h3>
      </div>
      <div className={styles.banner_active}>
        <h3>ATIVO</h3>
      </div>

      <div className={styles.actions}>
        <h3>AÇÕES</h3>
      </div>
    </div>
  );
};

export default TextInfos;
