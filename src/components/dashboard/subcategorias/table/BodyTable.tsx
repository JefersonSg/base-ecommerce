'use client';

import React from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import SubcategoriaItem from '../items/SubcategoriaItem';
import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';

const BodyTable = ({
  data,
  nextPage,
  setAtivoEdit,
  setAtivoDelete,
  setIdSubcategory,
  setIdCategory,
  setDefaultTitle,
  setDefaultDescription
}: {
  data?: subcategoryInterface[];
  idSubcategory: string;
  ativoDelete: boolean;
  nextPage: number[];
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdSubcategory: React.Dispatch<React.SetStateAction<string>>;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  setDefaultTitle: React.Dispatch<React.SetStateAction<string>>;
  setDefaultDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <table className={styles.BodyTable}>
      <thead>
        <TextInfos />
      </thead>

      <tbody>
        {data?.map(
          (subcategory, index) =>
            index >= nextPage[0] - 1 &&
            index <= nextPage[1] - 1 && (
              <SubcategoriaItem
                key={subcategory._id}
                name={subcategory.name}
                description={subcategory.description}
                category={subcategory.category}
                subcategoryId={subcategory._id}
                image={subcategory.image}
                setAtivoEdit={setAtivoEdit}
                setAtivoDelete={setAtivoDelete}
                setIdSubcategory={setIdSubcategory}
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
