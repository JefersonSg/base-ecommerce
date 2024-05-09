'use client';

import React from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import { type cuponsInterface } from '@/src/shared/helpers/interfaces';
import CupomItem from '../item/CupomItem';

interface GetAllCategoriesResponse {
  cupons: cuponsInterface[];
}

const BodyTable = ({
  data,
  setAtivoDelete,
  setCupomData
}: {
  data: GetAllCategoriesResponse;
  ativoDelete: boolean;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setCupomData: React.Dispatch<
    React.SetStateAction<cuponsInterface | undefined>
  >;
}) => {
  //

  return (
    <table className={styles.BodyTable}>
      <thead>
        <TextInfos />
      </thead>
      <tbody>
        {data?.cupons?.map((cupom, index) => {
          return (
            <CupomItem
              key={cupom?._id}
              setCupomData={setCupomData}
              cupomData={cupom}
              setAtivoDelete={setAtivoDelete}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default BodyTable;
