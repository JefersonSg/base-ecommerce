import styles from './LinksCategorias.module.css';
import {
  type subcategoryInterface,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import BotaoCategoria from './BotaoCategoria';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getAllSubcategories } from '@/src/shared/api/GETS';

function LinksCategorias({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [ativoLista, setAtivoLista] = React.useState<string>('');

  const { data } = useQuery<{ categories: CategoryInterface[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  const subcategoriesList = useQuery<{
    subcategories: subcategoryInterface[];
  }>({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
  });
  return (
    <ul className={styles.links}>
      {data?.categories?.map((category, index) => {
        return (
          <BotaoCategoria
            key={category._id}
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
