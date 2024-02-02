import React from 'react';
import CategoriaItem from './CategoriaItem';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';

const BodyTable = () => {
  return (
    <div className={styles.BodyTable}>
      <TextInfos />
      <CategoriaItem />
      <CategoriaItem />
      <CategoriaItem />
      <CategoriaItem />
      <CategoriaItem />
      <CategoriaItem />
      <CategoriaItem />
    </div>
  );
};

export default BodyTable;
