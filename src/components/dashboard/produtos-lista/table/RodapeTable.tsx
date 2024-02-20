import React from 'react';
import styles from './RodapeTable.module.css';
import ButtonPrevNext from '../../Botoes/ButtonPrevNext';

const RodapeTable = ({
  data,
  nextPage,
  currentPage,
  setNextPage,
  setCurrentPage
}: {
  data: any;
  nextPage: number[];
  currentPage: number;
  setNextPage: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={styles.container_rodape}>
      <p>
        Mostrando {nextPage[0] > 0 ? nextPage[0] : 1} a{' '}
        {nextPage[1] < 7 ? 7 : nextPage[1]} de um total de{' '}
        {data?.products?.length} produtos
      </p>
      <div className={styles.botoes}>
        <div
          onClick={() => {
            if (currentPage === 1) {
              setNextPage([1, 7]);
              return;
            }
            const next = nextPage[1] - 7;
            const prev = next - 7 + 1;

            setCurrentPage(currentPage - 1);
            setNextPage([prev, next]);
          }}
        >
          <ButtonPrevNext text="Anterior" />
        </div>
        <div
          onClick={() => {
            const prev = nextPage[1] + 1;
            const next = prev + 7 - 1;

            const totalPages = data?.products?.length / 7;

            if (next > data?.products?.length) {
              setNextPage([
                data?.products?.length - 7 + 1,
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
