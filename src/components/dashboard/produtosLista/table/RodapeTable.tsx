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
  // React.useEffect(() => {
  //   setNextPage([1, qntSelected]);
  // }, [qntSelected, setNextPage]);

  return (
    <div className={styles.container_rodape}>
      <p>
        Mostrando {nextPage[0] < 1 ? 1 : nextPage[0]} a{' '}
        {nextPage[1] < 7 ? 7 : nextPage[1]} de um total de{' '}
        {data?.products?.length} produtos
      </p>
      <div className={styles.botoes}>
        <div
          onClick={() => {
            if (currentPage === 1) {
              return;
            }
            let prev = currentPage * qntSelected - qntSelected - 1;
            const next = currentPage * qntSelected - qntSelected - 1;

            if (currentPage > 0) {
              prev = next - qntSelected;
            } else {
              prev = 1;
            }

            const totalPages = data?.products?.length / qntSelected;

            if (currentPage < Math.ceil(totalPages)) {
              setCurrentPage(currentPage - 1);
              setNextPage([prev, next]);
            }
          }}
        >
          <ButtonPrevNext text="Anterior" />
        </div>
        <div
          onClick={() => {
            let prev = currentPage * qntSelected - qntSelected;
            const next = currentPage * qntSelected + qntSelected;

            if (currentPage > 0) {
              prev = next - qntSelected;
            } else {
              prev = 1;
            }

            const totalPages = data?.products?.length / qntSelected;

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
