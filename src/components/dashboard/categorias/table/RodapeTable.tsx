import React from 'react';
import styles from './RodapeTable.module.css';
import ButtonPrevNext from '../../Botoes/ButtonPrevNext';

const RodapeTable = ({
  data,
  nextPage,
  qntSelected,
  currentPage,
  setNextPage,
  setCurrentPage
}: {
  data: any;
  qntSelected: number;
  nextPage: number[];
  currentPage: number;
  setNextPage: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={styles.container_rodape}>
      <p>
        Mostrando {nextPage[0] > 0 ? nextPage[0] : 1} a{' '}
        {data?.categories?.length < qntSelected
          ? data?.categories?.length
          : nextPage[1]}{' '}
        de um total de {data?.categories?.length} categorias
      </p>
      <div className={styles.botoes}>
        <div
          onClick={() => {
            if (currentPage === 1) {
              setNextPage([1, qntSelected]);
              return;
            }
            const next = nextPage[1] - qntSelected;
            const prev = next - qntSelected + 1;

            setCurrentPage(currentPage - 1);
            setNextPage([prev, next]);
          }}
        >
          <ButtonPrevNext text="Anterior" />
        </div>
        <div
          onClick={() => {
            const prev = nextPage[1] + 1;
            const next = prev + qntSelected - 1;

            const totalPages = data?.products?.length / qntSelected;

            if (next > data?.products?.length) {
              setNextPage([
                data?.products?.length - qntSelected + 1,
                data?.products?.length
              ]);
              return;
            }
            if (currentPage < Math.ceil(totalPages)) {
              setCurrentPage(currentPage + 1);
              setNextPage([prev, next]);
            }
          }}
        >
          <ButtonPrevNext text="Proximo" />
        </div>
      </div>
    </div>
  );
};

export default RodapeTable;
