import styles from './LinksCategorias.module.css';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import BotaoCategoria from './BotaoCategoria';
import React from 'react';
import { type subcategoriesListByCategory } from '@/src/app/(loja)/layout';

function LinksCategorias({
  setAtivo,
  categories,
  subcategoriesList
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  categories: {
    categories: CategoryInterface[];
  };
  subcategoriesList: subcategoriesListByCategory;
}) {
  const [ativoLista, setAtivoLista] = React.useState<string>('');
  return (
    <ul className={styles.links}>
      {categories?.categories?.map((category, index) => {
        return (
          <BotaoCategoria
            key={category._id}
            category={category}
            setAtivoLista={setAtivoLista}
            subcategories={subcategoriesList[index]}
            ativoLista={ativoLista}
            setAtivo={setAtivo}
          />
        );
      })}
    </ul>
  );
}

export default LinksCategorias;
