'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import { deleteCupom } from '@/src/shared/api/DELETE';
import { getAllCupons } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import { type cuponsInterface } from '@/src/shared/helpers/interfaces';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  const [cupomData, setCupomData] = React.useState<cuponsInterface>();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);

  const { data, refetch } = useQuery({
    queryKey: ['cupons-dashboard'],
    queryFn: getAllCupons
  });

  return (
    <>
      {ativoCreate && (
        <SideBarFormCreate
          setAtivo={setAtivoCreate}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
        />
      )}

      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivoCreate} />
        <BodyTable
          setCupomData={setCupomData}
          data={data}
          setAtivoDelete={setAtivoDelete}
          ativoDelete={ativoDelete}
        />
        <RodapeTable
          data={data}
          setCurrentPage={setCurrentPage}
          nextPage={nextPage}
          currentPage={currentPage}
          setNextPage={setNextPage}
        />
      </div>
      {ativoDelete && cupomData?._id && (
        <ModalDelete
          id1={cupomData?._id}
          setState={setAtivoDelete}
          text="Deseja mesmo deletar esse Cupom?"
          funcDelete={deleteCupom}
          refetch={refetch}
        />
      )}
      {ativoCreate || ativoDelete ? (
        <BackgoundClick setState1={setAtivoCreate} setState2={setAtivoDelete} />
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
    </>
  );
};

export default DataTable;
