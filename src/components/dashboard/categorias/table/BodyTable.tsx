import React from 'react';
import CategoriaItem from './CategoriaItem';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';

const BodyTable = ({
  setAtivoEdit,
  setAtivoDelete
}: {
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.BodyTable}>
      <TextInfos />
      <CategoriaItem
        setAtivoEdit={setAtivoEdit}
        setAtivoDelete={setAtivoDelete}
      />
      <CategoriaItem
        setAtivoEdit={setAtivoEdit}
        setAtivoDelete={setAtivoDelete}
      />
      <CategoriaItem
        setAtivoEdit={setAtivoEdit}
        setAtivoDelete={setAtivoDelete}
      />
      <CategoriaItem
        setAtivoEdit={setAtivoEdit}
        setAtivoDelete={setAtivoDelete}
      />
      <CategoriaItem
        setAtivoEdit={setAtivoEdit}
        setAtivoDelete={setAtivoDelete}
      />
      <CategoriaItem
        setAtivoEdit={setAtivoEdit}
        setAtivoDelete={setAtivoDelete}
      />
      <CategoriaItem
        setAtivoEdit={setAtivoEdit}
        setAtivoDelete={setAtivoDelete}
      />
    </div>
  );
};

export default BodyTable;
