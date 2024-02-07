'use client';

import React from 'react';
import CategoriaItem from './CategoriaItem';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/src/shared/api/GETS';
import ButtonDelete from '../../Botoes/ButtonDelete';
import ButtonAdd from '../../Botoes/ButtonAdd';
import { deleteCategory } from '@/src/shared/api/DELETE';

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
  idCategory,
  ativoDelete,
  setAtivoEdit,
  setAtivoDelete,
  setIdCategory,
  setDefaultTitle,
  setDefaultDescription
}: {
  idCategory: string;
  ativoDelete: boolean;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  setDefaultTitle: React.Dispatch<React.SetStateAction<string>>;
  setDefaultDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //
  const { data, refetch } = useQuery<GetAllCategoriesResponse>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  async function handleDelete(id: string) {
    await deleteCategory(id);
    await refetch();
  }

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
      {ativoDelete && (
        <div className={styles.delete_categoria}>
          <h2>Deseja mesmo deletar essa categoria?</h2>
          <div className={styles.botoes}>
            <div
              onClick={() => {
                void handleDelete(idCategory);
              }}
            >
              <ButtonDelete text="Deletar" setAtivo={setAtivoDelete} />
            </div>
            <ButtonAdd text="Não deletar" setAtivo={setAtivoDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyTable;
