'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import SideBarFormEdit from '../sidebars/SideBarFormEdit';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState('');
  const [ativoPopUp, setAtivoPopUp] = React.useState('');

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setAtivoPopUp('');
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [ativoPopUp]);

  return (
    <>
      {ativoCreate && (
        <SideBarFormCreate
          setAtivo={setAtivoCreate}
          setAtivoPopUp={setAtivoPopUp}
        />
      )}
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
        <BodyTable
          idDelete={idDelete}
          setIdDelete={setIdDelete}
          setAtivoEdit={setAtivoEdit}
          setAtivoDelete={setAtivoDelete}
          ativoDelete={ativoDelete}
        />
        <RodapeTable />
      </div>
      {ativoCreate ||
        ativoEdit ||
        (ativoDelete && (
          <div
            className={styles.background}
            onClick={() => {
              setAtivoCreate(false);
              setAtivoEdit(false);
              setAtivoDelete(false);
            }}
          ></div>
        ))}

      {ativoPopUp && <PopUpMessage text={ativoPopUp} />}
    </>
  );
};

export default DataTable;
