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
  setAtivoEdit,
  setAtivoDelete
}: {
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data } = useQuery<GetAllProductsResponse>({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  console.log(data?.products);
  return (
    <div className={styles.BodyTable}>
      <TextInfos />
      {data?.products.map((product) => {
        return (
          <div key={product._id}>
            <ProdutoItem
              name={product.name}
              images={product.images}
              idCategory={product._id}
              description={product.description}
              setAtivoDelete={setAtivoDelete}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BodyTable;
