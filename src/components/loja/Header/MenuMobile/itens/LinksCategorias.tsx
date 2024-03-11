import { useQuery } from '@tanstack/react-query';
import styles from './LinksCategorias.module.css';
import { getAllCategories } from '@/src/shared/api/GETS';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import BotaoCategoria from './BotaoCategoria';
import React from 'react';

function LinksCategorias({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data } = useQuery<{ categories: CategoryInterface[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  const [ativoLista, setAtivoLista] = React.useState<string>('');

  return (
    <ul className={styles.links}>
      {data?.categories?.map((category) => {
        return (
          <BotaoCategoria
            key={category._id}
            category={category}
            setAtivoLista={setAtivoLista}
            ativoLista={ativoLista}
            setAtivo={setAtivo}
          />
        );
      })}
    </ul>
  );
}

export default LinksCategorias;
