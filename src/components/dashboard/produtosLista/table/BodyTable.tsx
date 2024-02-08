import React from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/src/shared/api/GETS';
import ProdutoItem from './ProdutoItem';

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
  setAtivoEdit,
  setAtivoDelete,
  setIdDelete
}: {
  data: GetAllProductsResponse;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdDelete: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.BodyTable}>
      <TextInfos />
      {data?.products.map((product) => {
        return (
          <div key={product._id}>
            <ProdutoItem
              name={product.name}
              images={product.images}
              idProduct={product._id}
              description={product.description}
              setAtivoDelete={setAtivoDelete}
              setIdDelete={setIdDelete}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BodyTable;
