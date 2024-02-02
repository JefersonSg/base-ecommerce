'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';

const DataTable = () => {
  const [ativo, setAtivo] = React.useState(false);
  return (
    <>
      {ativo && <SideBarFormCreate setAtivo={setAtivo} />}
      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivo} />
        <BodyTable />
        <RodapeTable />
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
