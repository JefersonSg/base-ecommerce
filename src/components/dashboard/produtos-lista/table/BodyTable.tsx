import React from 'react';
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
  nextPage,
  setNoActivesProducts,
  noActivesProducts,
  setPromotionProducts,
  promotionProducts
}: {
  data: GetAllProductsResponse;
  nextPage: number[];
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdDelete: React.Dispatch<React.SetStateAction<string>>;
  setNoActivesProducts: React.Dispatch<React.SetStateAction<boolean>>;
  noActivesProducts: boolean;
  setPromotionProducts: React.Dispatch<React.SetStateAction<boolean>>;
  promotionProducts: boolean;
}) => {
  return (
    <table className={styles.BodyTable}>
      <thead>
        <TextInfos
          promotionProducts={promotionProducts}
          setPromotionProducts={setPromotionProducts}
          setNoActivesProducts={setNoActivesProducts}
          noActivesProducts={noActivesProducts}
        />
      </thead>

      <tbody>
        {data?.products?.map(
          (product, index) =>
            index >= nextPage[0] - 1 &&
            index <= nextPage[1] - 1 && (
              <ProdutoItem
                key={product._id}
                data={product}
                setAtivoDelete={setAtivoDelete}
                setIdDelete={setIdDelete}
              />
            )
        )}
      </tbody>
    </table>
  );
};

export default BodyTable;
