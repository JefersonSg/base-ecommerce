import React from 'react';
import styles from './Entrega.module.css';
import Enderecos from './Enderecos';

const EntregaFinalizar = () => {
  return (
    <div className={styles.entrega_container}>
      <div className={styles.tituloArea}></div>
      <Enderecos />
    </div>
  );
};

export default EntregaFinalizar;
