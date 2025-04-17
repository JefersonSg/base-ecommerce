'use client';

import styles from './LinksCategorias.module.css';
import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';
import BotaoCategoria from './BotaoCategoria';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import categoriesGetAll from '@/src/actions/category-get-all';
import subcategoriesGetAll from '@/src/actions/subcategory-get-all';

function LinksCategorias({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [ativoLista, setAtivoLista] = React.useState<string>('');

  const { data } = useQuery({
    queryKey: ['categories-get-all'],
    queryFn: async () => await categoriesGetAll()
  });
  const subcategoriesList = useQuery<{
    subcategories: subcategoryInterface[];
  }>({
    queryKey: ['subcategories-get-all'],
    queryFn: async () => await subcategoriesGetAll()
  });

  return (
    <ul className={styles.links}>
      {data?.categories?.map((category, index) => {
        if (!category) {
          return <></>;
        }
        return (
          <BotaoCategoria
            key={category._id + index}
            category={category}
            setAtivoLista={setAtivoLista}
            subcategories={subcategoriesList.data}
            ativoLista={ativoLista}
            setAtivo={setAtivo}
          />
        );
      })}
    </ul>
  );
}

export default LinksCategorias;
