import React from 'react';
import styles from './RodapeTable.module.css';
import ButtonPrevNext from '../Botoes/ButtonPrevNext';

const RodapeTable = () => {
  return (
    <div className={styles.container_rodape}>
      <p>Mostrando 1 a 7 de um total de 14 categorias</p>
      <div className={styles.botoes}>
        <ButtonPrevNext text="Anterior" />
        <ButtonPrevNext text="Proximo" />
      </div>
    </div>
  );
};

export default RodapeTable;
