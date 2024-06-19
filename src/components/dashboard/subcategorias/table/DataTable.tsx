'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/FormCreateSubcategory';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import SideBarFormEdit from '../sidebars/FormEditSubcategory';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import { deleteSubcategory } from '@/src/shared/api/DELETE';
import { getAllSubcategories } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import LoadingAnimation from '@/src/components/compartilhado/loading/loadingAnimation';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [idSubcategory, setIdSubcategory] = React.useState('');
  const [categoryId, setIdCategory] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  const [defaultTitle, setDefaultTitle] = React.useState('');
  const [defaultDescription, setDefaultDescription] = React.useState('');

  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);

  const { data, refetch } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
  });

  async function handleDelete(id: string) {
    try {
      setIsLoading(true);
      await deleteSubcategory(id);
      await refetch();
      setIsLoading(false);
      setMessagePopUp('Subcategoria removida');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {ativoCreate && (
        <SideBarFormCreate
          setTypePopUp={setTypePopUp}
          setAtivo={setAtivoCreate}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {ativoEdit && (
        <SideBarFormEdit
          category={categoryId}
          idSubcategory={idSubcategory}
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
          setIdCategory={setIdCategory}
          idSubcategory={idSubcategory}
          setIdSubcategory={setIdSubcategory}
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
          id1={idSubcategory}
          text="Deseja mesmo deletar essa subcategoria?"
          messageToErrorPopUp="Erro ao remover subcategoria"
          messageToPopUp="Subcategoria removida"
          setIsLoading={setIsLoading}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          setState={setAtivoDelete}
          funcDelete={handleDelete}
          refetch={refetch}
        />
      )}
      {!!ativoCreate || !!ativoEdit || !!ativoDelete ? (
        <div
          className={styles.background}
          onClick={() => {
            setAtivoCreate(false);
            setAtivoEdit(false);
            setAtivoDelete(false);
          }}
        ></div>
      ) : (
        <></>
      )}

      {messagePopUp && (
        <PopUpMessage
          text={messagePopUp}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
        />
      )}
      {isLoading && <LoadingAnimation />}
    </>
  );
};

export default DataTable;
