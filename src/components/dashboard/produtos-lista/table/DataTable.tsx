/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import { deleteProduct } from '@/src/shared/api/DELETE';
import { useQuery } from '@tanstack/react-query';
import {
  getAllProducts,
  getNoActiveProducts,
  getProductByName,
  getProductByPromotion
} from '@/src/shared/api/GETS';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);
  const [pesquisa, setPesquisa] = React.useState('');
  const [promotionProducts, setPromotionProducts] = React.useState(false);
  const [noActivesProducts, setNoActivesProducts] = React.useState(false);

  const { data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });
  const dataPesquisa = useQuery({
    queryKey: ['products', pesquisa],
    queryFn: async () => {
      if (pesquisa) {
        return await getProductByName(pesquisa);
      }
    }
  });
  const noActives = useQuery({
    queryKey: ['products-no-actives'],
    queryFn: getNoActiveProducts
  });
  const promotions = useQuery({
    queryKey: ['get-products-by-promotion'],
    queryFn: getProductByPromotion
  });

  React.useEffect(() => {
    if (pesquisa) {
      setPromotionProducts(false);
      setNoActivesProducts(false);
    }
  }, [pesquisa]);

  return (
    <>
      <div className={styles.data_table}>
        <TopTable
          setAtivo={setAtivoCreate}
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
        />
        <BodyTable
          promotionProducts={promotionProducts}
          setPromotionProducts={setPromotionProducts}
          nextPage={nextPage}
          noActivesProducts={noActivesProducts}
          data={
            noActivesProducts
              ? noActives?.data
              : promotionProducts
                ? promotions.data
                : pesquisa
                  ? dataPesquisa?.data
                  : data
          }
          setIdDelete={setIdDelete}
          setAtivoDelete={setAtivoDelete}
          setNoActivesProducts={setNoActivesProducts}
        />
        <RodapeTable
          data={
            noActivesProducts
              ? noActives?.data
              : promotionProducts
                ? promotions.data
                : pesquisa
                  ? dataPesquisa?.data
                  : data
          }
          setCurrentPage={setCurrentPage}
          nextPage={nextPage}
          currentPage={currentPage}
          setNextPage={setNextPage}
        />
      </div>
      {ativoCreate || ativoDelete ? (
        <BackgoundClick setState1={setAtivoCreate} setState2={setAtivoDelete} />
      ) : (
        <></>
      )}
      {ativoDelete && (
        <ModalDelete
          text="Deseja mesmo deletar esse produto?"
          id1={idDelete}
          setState={setAtivoDelete}
          funcDelete={deleteProduct}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default DataTable;
