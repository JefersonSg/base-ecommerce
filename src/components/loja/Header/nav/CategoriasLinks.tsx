import styles from './Links.module.css';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import Categoria from './Categoria';
import { type subcategoriesListByCategory } from '@/src/app/(loja)/layout';

const CategoriasLinks = ({
  categories,
  subcategoriesList
}: {
  categories: {
    categories: CategoryInterface[];
  };
  subcategoriesList: subcategoriesListByCategory;
}) => {
  return (
    <nav className={styles.container_nav}>
      <ul className={styles.categorias_lista}>
        {categories?.categories?.map((category, index) => {
          return (
            <Categoria
              key={category?._id}
              category={category}
              subcategoriesList={subcategoriesList[index]}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoriasLinks;
