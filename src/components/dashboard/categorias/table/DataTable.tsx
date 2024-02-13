'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import SideBarFormEdit from '../sidebars/SideBarFormEdit';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import ButtonDelete from '../../Botoes/ButtonDelete';
import ButtonAdd from '../../Botoes/ButtonAdd';
import { deleteCategory } from '@/src/shared/api/DELETE';
import { getAllCategories } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [idCategory, setIdCategory] = React.useState('');
  const [ativoPopUp, setAtivoPopUp] = React.useState('');

  const [defaultTitle, setDefaultTitle] = React.useState('');
  const [defaultDescription, setDefaultDescription] = React.useState('');

  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);

  const { data, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setAtivoPopUp('');
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [ativoPopUp]);

  async function handleDelete(id: string) {
    await deleteCategory(id);
    await refetch();
  }

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
          idCategory={idCategory}
          setAtivo={setAtivoEdit}
          name={defaultTitle}
          description={defaultDescription}
          image={['']}
        />
      )}
      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivoCreate} />
        <BodyTable
          data={data}
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
        <div className={styles.delete_categoria}>
          <h2>Deseja mesmo deletar essa categoria?</h2>
          <div className={styles.botoes}>
            <div
              onClick={() => {
                void handleDelete(idCategory);
              }}
            >
              <ButtonDelete text="Deletar" setAtivo={setAtivoDelete} />
            </div>
            <div
              onClick={() => {
                setAtivoDelete(false);
              }}
            >
              <ButtonAdd text="Não deletar" setAtivo={setAtivoDelete} />
            </div>
          </div>
        </div>
      )}
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
