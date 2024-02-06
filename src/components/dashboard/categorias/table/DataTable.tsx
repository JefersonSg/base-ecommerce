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
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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
            <div>
              <ButtonDelete
                text="Deletar"
                setAtivo={setAtivoDelete}
                isLoading={isLoading}
              />
            </div>
            <ButtonAdd
              text="Não deletar"
              setAtivo={setAtivoDelete}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
      {ativoPopUp && <PopUpMessage text={ativoPopUp} />}
    </>
  );
};

export default DataTable;
