import React from 'react';
import styles from './Carrinho.module.css';

import ContainerCart from '@/src/components/loja/shopping-cart/Container_cart';

const page = () => {
  return (
    <div className={styles.carrinho_container}>
      <ContainerCart />
    </div>
  );
};

export default page;
