'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import SideBarFormEdit from '../sidebars/SideBarFormEdit';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import { deleteCategory } from '@/src/shared/api/DELETE';
import { getAllCategories } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [idCategory, setIdCategory] = React.useState('');
  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  const [defaultTitle, setDefaultTitle] = React.useState('');
  const [defaultDescription, setDefaultDescription] = React.useState('');

  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);

  const { data, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  return (
    <>
      {ativoCreate && (
        <SideBarFormCreate
          setAtivo={setAtivoCreate}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {ativoEdit && (
        <SideBarFormEdit
          idCategory={idCategory}
          setAtivo={setAtivoEdit}
          name={defaultTitle}
          description={defaultDescription}
        />
      )}
      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivoCreate} />
        <BodyTable
          data={data}
          nextPage={nextPage}
          idCategory={idCategory}
          setIdCategory={setIdCategory}
          setAtivoEdit={setAtivoEdit}
          setAtivoDelete={setAtivoDelete}
          ativoDelete={ativoDelete}
          setDefaultTitle={setDefaultTitle}
          setDefaultDescription={setDefaultDescription}
        />
        <RodapeTable
          data={data}
          setCurrentPage={setCurrentPage}
          nextPage={nextPage}
          currentPage={currentPage}
          setNextPage={setNextPage}
        />
      </div>
      {ativoDelete && (
        <ModalDelete
          id1={idCategory}
          setState={setAtivoDelete}
          text="Deseja mesmo deletar essa categoria?"
          funcDelete={deleteCategory}
          refetch={refetch}
        />
      )}
      {ativoCreate || ativoEdit || ativoDelete ? (
        <BackgoundClick
          setState1={setAtivoCreate}
          setState2={setAtivoDelete}
          setState3={setAtivoEdit}
        />
      ) : (
        <></>
      )}

      {messagePopUp && (
        <PopUpMessage
          text={messagePopUp}
          setMessagePopUp={setMessagePopUp}
          typePopUp={typePopUp}
          setTypePopUp={setTypePopUp}
        />
      )}
    </>
  );
};

export default DataTable;
