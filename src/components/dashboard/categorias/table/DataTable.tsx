'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import SideBarFormEdit from '../sidebars/SideBarFormEdit';
import ButtonDelete from '../../Botoes/ButtonDelete';
import ButtonAdd from '../../Botoes/ButtonAdd';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);

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
        <BodyTable
          setAtivoEdit={setAtivoEdit}
          setAtivoDelete={setAtivoDelete}
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
      {ativoDelete && (
        <div className={styles.delete_categoria}>
          <h2>Deseja mesmo deletar essa categoria?</h2>
          <div className={styles.botoes}>
            <ButtonDelete text="Deletar" setAtivo={setAtivoDelete} />
            <ButtonAdd text="Não deletar" setAtivo={setAtivoDelete} />
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
