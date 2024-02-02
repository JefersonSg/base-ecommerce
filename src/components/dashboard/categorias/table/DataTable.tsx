'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import SideBarFormEdit from '../sidebars/SideBarFormEdit';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  return (
    <>
      {ativoCreate && <SideBarFormCreate setAtivo={setAtivoCreate} />}
      {ativoEdit && (
        <SideBarFormEdit
          setAtivo={setAtivoEdit}
          title={'Batom'}
          description={'Encontre os melhores batons'}
          image={['']}
        />
      )}
      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivoCreate} />
        <BodyTable setAtivoEdit={setAtivoEdit} />
        <RodapeTable />
      </div>
      {ativoCreate ||
        (ativoEdit && (
          <div
            className={styles.background}
            onClick={() => {
              setAtivoCreate(false);
              setAtivoEdit(false);
            }}
          ></div>
        ))}
    </>
  );
};

export default DataTable;
