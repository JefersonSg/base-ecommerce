import React from 'react';
import styles from './Envio.module.css';

const Envio = () => {
  return (
    <div className={styles.envio_container}>
      <h3>Envio:</h3>
      <span>O valor sera calculado pela nossa equipe ao concluir a compra</span>
    </div>
  );
};

export default Envio;
