import React from 'react';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Loading;
