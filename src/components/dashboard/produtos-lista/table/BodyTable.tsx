import React, { Suspense } from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import ProdutoItem from '../items/ProdutoItem';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

interface GetAllProductsResponse {
  products: ProductApi[];
}

const BodyTable = ({
  data,
  setAtivoDelete,
  setIdDelete,
  nextPage
}: {
  data: GetAllProductsResponse;
  nextPage: number[];
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdDelete: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.BodyTable}>
      <TextInfos />
      {data?.products?.map((product, index) => {
        return (
          <div key={product._id}>
            {index >= nextPage[0] - 1 && index <= nextPage[1] - 1 && (
              <Suspense>
                <ProdutoItem
                  data={product}
                  setAtivoDelete={setAtivoDelete}
                  setIdDelete={setIdDelete}
                />
              </Suspense>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BodyTable;
