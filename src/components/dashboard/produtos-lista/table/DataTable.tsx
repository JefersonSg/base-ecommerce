/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import { deleteProduct } from '@/src/shared/api/DELETE';
import { useQuery } from '@tanstack/react-query';

import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import LoadingAnimation from '@/src/components/compartilhado/loading/loadingAnimation';
import productsFilterGet from '@/src/actions/products-filters-get';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);
  const [pesquisa, setPesquisa] = React.useState('');
  const [promotionProducts, setPromotionProducts] = React.useState(false);
  const [noActivesProducts, setNoActivesProducts] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  const { data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await productsFilterGet({ total: 1000 })
  });
  const dataPesquisa = useQuery({
    queryKey: ['products', pesquisa],
    queryFn: async () => {
      if (pesquisa) {
        return await productsFilterGet({ name: pesquisa, total: 1000 });
      }
    }
  });
  const noActives = useQuery({
    queryKey: ['products-no-actives'],
    queryFn: async () => await productsFilterGet({ active: false, total: 1000 })
  });
  const promotions = useQuery({
    queryKey: ['get-products-by-promotion'],
    queryFn: async () => {
      return await productsFilterGet({ promotion: true, total: 1000 });
    }
  });

  React.useEffect(() => {
    if (pesquisa) {
      setPromotionProducts(false);
      setNoActivesProducts(false);
    }
  }, [pesquisa]);

  async function removeProduct() {
    await deleteProduct(idDelete);
  }

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
              ? noActives?.data?.products
              : promotionProducts
                ? promotions.data?.products
                : pesquisa
                  ? dataPesquisa?.data?.products
                  : data?.products
          }
          setIdDelete={setIdDelete}
          setAtivoDelete={setAtivoDelete}
          setNoActivesProducts={setNoActivesProducts}
        />
        <RodapeTable
          data={
            noActivesProducts
              ? noActives?.data?.products
              : promotionProducts
                ? promotions.data?.products
                : pesquisa
                  ? dataPesquisa?.data?.products
                  : data?.products
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
          id1={idDelete}
          text="Deseja mesmo deletar esse produto?"
          messageToErrorPopUp="Erro ao remover o produto"
          messageToPopUp="Produto removido"
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          setIsLoading={setIsLoading}
          setState={setAtivoDelete}
          funcDelete={removeProduct}
          refetch={refetch}
        />
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
