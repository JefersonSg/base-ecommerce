'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import SideBarFormCreate from '../sidebars/SideBarFormCreate';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import SideBarFormEdit from '../sidebars/SideBarFormEdit';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import { deleteBanner } from '@/src/shared/api/DELETE';
import { getAllBanners } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [ativoPopUp, setAtivoPopUp] = React.useState('');

  const [bannerData, setBannerData] = React.useState<any>();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);

  const { data, refetch } = useQuery({
    queryKey: ['banners-dashboard'],
    queryFn: getAllBanners
  });

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
        <SideBarFormEdit bannerData={bannerData} setAtivo={setAtivoEdit} />
      )}
      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivoCreate} />
        <BodyTable
          setBannerData={setBannerData}
          data={data}
          setAtivoEdit={setAtivoEdit}
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
      {ativoDelete && (
        <ModalDelete
          id1={bannerData?._id}
          setState={setAtivoDelete}
          text="Deseja mesmo deletar essa categoria?"
          funcDelete={deleteBanner}
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

      {ativoPopUp && <PopUpMessage text={ativoPopUp} />}
    </>
  );
};

export default DataTable;
