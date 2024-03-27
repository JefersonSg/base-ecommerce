import React from 'react';
import styles from './RodapeTable.module.css';
import ButtonPrevNext from '../../Botoes/ButtonPrevNext';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';

const RodapeTable = ({
  data,
  nextPage,
  currentPage,
  setNextPage,
  setCurrentPage
}: {
  data: { categories: CategoryInterface[] };
  nextPage: number[];
  currentPage: number;
  setNextPage: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={styles.container_rodape}>
      <p>
        Mostrando {nextPage[0] > 0 ? nextPage[0] : 1} a{' '}
        {data?.categories?.length < 7 ? data?.categories?.length : nextPage[1]}{' '}
        de um total de {data?.categories?.length} categorias
      </p>
      <div className={styles.botoes}>
        <div
          onClick={() => {
            console.log(currentPage);
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
            console.log(currentPage);

            const totalPages = data?.categories?.length / 7;

            if (next > data?.categories?.length) {
              setNextPage([
                data?.categories?.length - 7 + 1,
                data?.categories?.length
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
