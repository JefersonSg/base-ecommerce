'use client';

import React from 'react';
import styles from './Entrega.module.css';
import Enderecos from './Enderecos';

const EntregaFinalizar = () => {
  return (
    <div className={`card ${styles.entrega_container}`}>
      <Enderecos />
    </div>
  );
};

export default EntregaFinalizar;
