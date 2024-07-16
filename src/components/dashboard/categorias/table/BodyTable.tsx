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
  nextPage,
  setAtivoEdit,
  setAtivoDelete,
  setIdCategory,
  setDefaultTitle,
  setDefaultDescription
}: {
  data?: GetAllCategoriesResponse;
  nextPage: number[];
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
    <table className={styles.BodyTable}>
      <thead>
        <TextInfos />
      </thead>

      <tbody>
        {data?.categories?.map(
          (category, index) =>
            index >= nextPage[0] - 1 &&
            index <= nextPage[1] - 1 && (
              <CategoriaItem
                key={category._id}
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
            )
        )}
      </tbody>
    </table>
  );
};

export default BodyTable;
