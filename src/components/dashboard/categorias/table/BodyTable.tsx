import React from 'react';
import CategoriaItem from './CategoriaItem';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';

const BodyTable = ({
  setAtivoEdit
}: {
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.BodyTable}>
      <TextInfos />
      <CategoriaItem setAtivoEdit={setAtivoEdit} />
      <CategoriaItem setAtivoEdit={setAtivoEdit} />
      <CategoriaItem setAtivoEdit={setAtivoEdit} />
      <CategoriaItem setAtivoEdit={setAtivoEdit} />
      <CategoriaItem setAtivoEdit={setAtivoEdit} />
      <CategoriaItem setAtivoEdit={setAtivoEdit} />
      <CategoriaItem setAtivoEdit={setAtivoEdit} />
    </div>
  );
};

export default BodyTable;
