import React from 'react';
import styles from './RodapeTable.module.css';
import ButtonPrevNext from '../../Botoes/ButtonPrevNext';
import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';

const RodapeTable = ({
  data,
  nextPage,
  currentPage,
  setNextPage,
  setCurrentPage
}: {
  data?: subcategoryInterface[];
  nextPage: number[];
  currentPage: number;
  setNextPage: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (!data) {
    return <></>;
  }
  return (
    <div className={styles.container_rodape}>
      <p>
        Mostrando {nextPage[0] > 0 ? nextPage[0] : 1} a{' '}
        {data?.length < 7 ? data?.length : nextPage[1]} de um total de{' '}
        {data?.length} categorias
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

            const totalPages = data?.length / 7;

            if (next > data?.length) {
              setNextPage([data?.length - 7 + 1, data?.length]);
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
