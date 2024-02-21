'use client';

import React from 'react';
import CategoriaItem from '../item/CategoriaItem';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';

interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
}
interface GetAllCategoriesResponse {
  categories: Category[];
}

const BodyTable = ({
  data,
  setAtivoEdit,
  setAtivoDelete,
  setIdCategory,
  setDefaultTitle,
  setDefaultDescription
}: {
  data: GetAllCategoriesResponse;
  idCategory: string;
  ativoDelete: boolean;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  setDefaultTitle: React.Dispatch<React.SetStateAction<string>>;
  setDefaultDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //

  return (
    <div className={styles.BodyTable}>
      <TextInfos />

      {data?.categories?.map((category, index) => {
        return (
          <div key={category._id}>
            <CategoriaItem
              name={category.name}
              description={category.description}
              image={category.image}
              setAtivoEdit={setAtivoEdit}
              setAtivoDelete={setAtivoDelete}
              idCategory={category._id}
              setIdCategory={setIdCategory}
              setDefaultTitle={setDefaultTitle}
              setDefaultDescription={setDefaultDescription}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BodyTable;
