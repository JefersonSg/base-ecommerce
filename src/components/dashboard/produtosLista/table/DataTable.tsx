/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';
import BodyTable from './BodyTable';
import RodapeTable from './RodapeTable';
import ButtonDelete from '../../Botoes/ButtonDelete';
import ButtonAdd from '../../Botoes/ButtonAdd';
import { deleteProduct } from '@/src/shared/api/DELETE';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/src/shared/api/GETS';

const DataTable = () => {
  const [ativoCreate, setAtivoCreate] = React.useState(false);
  const [ativoDelete, setAtivoDelete] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPage, setNextPage] = React.useState([1, 7]);

  const { data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  async function handleDelete() {
    await deleteProduct(idDelete);
    await refetch();
  }

  return (
    <>
      <div className={styles.data_table}>
        <TopTable setAtivo={setAtivoCreate} />
        {data && (
          <BodyTable
            nextPage={nextPage}
            data={data}
            setIdDelete={setIdDelete}
            setAtivoDelete={setAtivoDelete}
          />
        )}
        <RodapeTable
          data={data}
          setCurrentPage={setCurrentPage}
          nextPage={nextPage}
          currentPage={currentPage}
          setNextPage={setNextPage}
        />
      </div>
      {ativoCreate ||
        (ativoDelete && (
          <div
            className={styles.background}
            onClick={() => {
              setAtivoCreate(false);
              setAtivoDelete(false);
            }}
          ></div>
        ))}
      {ativoDelete && (
        <div className={styles.delete_categoria}>
          <h2>Deseja mesmo deletar essa categoria?</h2>
          <div className={styles.botoes}>
            <div onClick={handleDelete}>
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
    </>
  );
};

export default DataTable;
