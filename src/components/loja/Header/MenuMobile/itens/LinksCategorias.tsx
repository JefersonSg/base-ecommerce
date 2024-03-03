import { useQuery } from '@tanstack/react-query';
import styles from './LinksCategorias.module.css';
import { getAllCategories } from '@/src/shared/api/GETS';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import BotaoCategoria from './BotaoCategoria';

function LinksCategorias({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data } = useQuery<{ categories: CategoryInterface[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  return (
    <ul className={styles.links}>
      {data?.categories?.map((category) => {
        return (
          <BotaoCategoria
            key={category._id}
            category={category}
            setAtivo={setAtivo}
          />
        );
      })}
    </ul>
  );
}

export default LinksCategorias;
