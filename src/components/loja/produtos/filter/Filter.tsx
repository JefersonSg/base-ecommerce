import React from 'react';
import styles from './Filtes.module.css';

const Filter = () => {
  return (
    <div className={styles.filter_container}>
      <h1>Filtrar</h1>
      <nav className={`${styles.filter} ${styles.filter_category}`}>
        <p>Categorias</p>
        <ul>
          <li>Todos os produtos</li>
          <li>Acessórios</li>
          <li>Corpo</li>
          <li>Labios</li>
          <li>Face</li>
        </ul>
      </nav>
    </div>
  );
};

export default Filter;
