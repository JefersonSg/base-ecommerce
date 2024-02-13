'use client';

import Image from 'next/image';
import React from 'react';
import styles from './subcategoriaItem.module.css';
import { getCategoryById } from '@/src/shared/api/GETS';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
// import { getCategoryById } from '@/src/shared/api/GETS';

const SubcategoriaItem = ({
  idSubcategory,
  name,
  description,
  image,
  category,
  setAtivoEdit,
  setAtivoDelete,
  setIdSubcategory,
  setIdCategory,
  setDefaultTitle,
  setDefaultDescription
}: {
  idSubcategory: string;
  name: string;
  description: string;
  image: string;
  category: string;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdSubcategory: React.Dispatch<React.SetStateAction<string>>;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  setDefaultTitle: React.Dispatch<React.SetStateAction<string>>;
  setDefaultDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [categoryApi, setCategoryApi] = React.useState<{
    category: CategoryInterface;
  }>();

  React.useEffect(() => {
    const getCategoryName = async () => {
      const response = await getCategoryById(category);
      setCategoryApi(response);
    };

    void getCategoryName();
  }, [category]);

  return (
    <div className={styles.categoria_item}>
      <div className={styles.div_img}>
        <Image
          alt="Imagem da categoria"
          src={image || '/categorias/batom.png'}
          width={40}
          height={40}
        />
      </div>

      <div className={styles.infos}>
        <h3 className={`name ${styles.name}`}>{name}</h3>
        <p className={`description ${styles.description}`}>
          {categoryApi?.category?.name ?? '"categoria não encontrada"'}
        </p>
      </div>
      <div className={styles.total_products_register}>
        <h3>75</h3>
      </div>
      <div className={styles.total_products_value}>
        <h3>R$2479,23</h3>
      </div>
      <div className={styles.actions}>
        <Image
          alt="Lixeira para deletar a categoria"
          src={'/dashboard/lixeira.svg'}
          width={16}
          height={18}
          onClick={() => {
            setIdSubcategory(idSubcategory);
            setAtivoDelete(true);
          }}
        />
        <div
          onClick={() => {
            setIdSubcategory(idSubcategory);
            setIdCategory(category);
          }}
        >
          <Image
            alt="Imagem de um lapis para editar a subcategoria"
            src={'/dashboard/edit.svg'}
            width={16}
            height={18}
            onClick={() => {
              setDefaultTitle(name);
              setDefaultDescription(description);
              setAtivoEdit(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubcategoriaItem;
