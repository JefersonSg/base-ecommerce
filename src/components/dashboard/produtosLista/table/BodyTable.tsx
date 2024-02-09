import React from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
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
  setAtivoDelete,
  setIdDelete,
  nextPage,
  qntSelected
}: {
  data: GetAllProductsResponse;
  qntSelected: number;
  nextPage: number[];
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdDelete: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.BodyTable}>
      <TextInfos />
      {data?.products.map((product, index) => {
        return (
          <div key={product._id}>
            <p>{index}</p>
            {index >= nextPage[0] && index <= nextPage[1] && (
              <ProdutoItem
                name={product.name}
                images={product.images}
                idProduct={product._id}
                description={product.description}
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
