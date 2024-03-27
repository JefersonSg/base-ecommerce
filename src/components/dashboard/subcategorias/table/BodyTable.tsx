'use client';

import React from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import SubcategoriaItem from './SubcategoriaItem';

interface Subcategory {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}
interface GetAllSubcategoriesResponse {
  subcategories: Subcategory[];
}

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
  data: GetAllSubcategoriesResponse;
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
    <div className={styles.BodyTable}>
      <TextInfos />

      {data?.subcategories?.map(
        (subcategory, index) =>
          index >= nextPage[0] - 1 &&
          index <= nextPage[1] - 1 && (
            <div key={subcategory._id}>
              <SubcategoriaItem
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
            </div>
          )
      )}
    </div>
  );
};

export default BodyTable;
