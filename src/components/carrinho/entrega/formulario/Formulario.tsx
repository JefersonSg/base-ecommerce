import React from 'react';
import styles from './Formulario.module.css';

const Formulario = () => {
  return (
    <form action="" className={styles.formulario_enderecos}>
      <input type="text" placeholder="Cidade" />
      <input type="text" placeholder="Rua" />
      <input type="text" placeholder="Bairro" />
      <input type="text" placeholder="CEP" />

      <div className={styles.input_casa}>
        <input type="text" placeholder="Casa, Ap" />
        <input type="text" placeholder="Numero" />
      </div>
      <span>Editar</span>
    </form>
  );
};

export default Formulario;
