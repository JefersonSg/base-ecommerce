import React from 'react';
import styles from './LoadingProducts.module.css';
const LoadingProducts = () => {
  return (
    <>
      <div className={styles.loading_product}></div>
      <div className={styles.loading_product}></div>
      <div className={styles.loading_product}></div>
      <div className={styles.loading_product}></div>
    </>
  );
};

export default LoadingProducts;
