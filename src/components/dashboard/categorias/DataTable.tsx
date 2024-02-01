'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarForm from './SideBarForm';
import BodyTable from './BodyTable';

const DataTable = () => {
  const [ativo, setAtivo] = React.useState(false);
  return (
    <>
      {ativo && <SideBarForm setAtivo={setAtivo} />}
      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivo} />
        <BodyTable />
      </div>
      {ativo && (
        <div
          className={styles.background}
          onClick={() => {
            setAtivo(false);
          }}
        ></div>
      )}
    </>
  );
};

export default DataTable;
