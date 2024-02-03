import React from 'react';
import Produto from './Produto';
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
      <Produto setAtivoEdit={setAtivoEdit} setAtivoDelete={setAtivoDelete} />
      <Produto setAtivoEdit={setAtivoEdit} setAtivoDelete={setAtivoDelete} />
      <Produto setAtivoEdit={setAtivoEdit} setAtivoDelete={setAtivoDelete} />
      <Produto setAtivoEdit={setAtivoEdit} setAtivoDelete={setAtivoDelete} />
      <Produto setAtivoEdit={setAtivoEdit} setAtivoDelete={setAtivoDelete} />
      <Produto setAtivoEdit={setAtivoEdit} setAtivoDelete={setAtivoDelete} />
      <Produto setAtivoEdit={setAtivoEdit} setAtivoDelete={setAtivoDelete} />
    </div>
  );
};

export default BodyTable;
