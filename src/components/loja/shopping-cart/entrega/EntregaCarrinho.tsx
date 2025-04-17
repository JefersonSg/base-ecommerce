import React from 'react';
import styles from './Entrega.module.css';
import Enderecos from './Enderecos';

const EntregaCarrinho = () => {
  return (
    <div className={styles.entrega_container}>
      <Enderecos />
    </div>
  );
};

export default EntregaCarrinho;
