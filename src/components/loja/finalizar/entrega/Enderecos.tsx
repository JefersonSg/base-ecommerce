import React from 'react';
import styles from './Enderecos.module.css';
import Formulario from './formulario/Formulario';

const Enderecos = () => {
  return (
    <>
      <div className={styles.enderecos_cadastrados}>
        <p className={'subtitle_finalizar'}>Endereço cadastrado</p>
      </div>
      <Formulario />
    </>
  );
};

export default Enderecos;
