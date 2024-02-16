import React from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import ProdutoItem from '../items/ProdutoItem';

interface ProductsType {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  colors: string[];
  codecolors: string[];
  category: string;
  images: string[];
  stock: { sizeP: string[]; sizeM: string; sizeG: string; sizeGG: string };
  promotion: boolean;
  to: string;
  active: boolean;
}

interface GetAllProductsResponse {
  products: ProductsType[];
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
              <ProdutoItem
                data={product}
                setAtivoDelete={setAtivoDelete}
                setIdDelete={setIdDelete}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BodyTable;
