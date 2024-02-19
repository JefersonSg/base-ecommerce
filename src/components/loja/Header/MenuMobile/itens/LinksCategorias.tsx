import { useQuery } from '@tanstack/react-query';
import BotaoLi from './BotaoLi';
import styles from './LinksCategorias.module.css';
import { getAllCategories } from '@/src/shared/api/GETS';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';

function LinksCategorias() {
  const { data } = useQuery<{ categories: CategoryInterface[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  console.log(data);
  return (
    <ul className={styles.links}>
      {data?.categories?.map((category) => {
        return (
          <BotaoLi
            key={category?._id}
            texto={category?.name}
            link={`produtos/categoria/${category._id}`}
          />
        );
      })}
    </ul>
  );
}

export default LinksCategorias;
