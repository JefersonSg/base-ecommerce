import React from 'react';
import styles from './TituloAccordeon.module.css';

const TituloAccordeon = ({ title }: { title: string }) => {
  return (
    <div>
      <h3 className={styles.titulo_accordeon}>{title}</h3>
    </div>
  );
};

export default TituloAccordeon;
