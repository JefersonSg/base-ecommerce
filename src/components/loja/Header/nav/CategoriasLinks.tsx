import styles from './Links.module.css';
import Categoria from './Categoria';
import categoriesGetAll from '@/src/actions/category-get-all';
import subcategoriesGetAll from '@/src/actions/subcategory-get-all';

const CategoriasLinks = async () => {
  const data = await categoriesGetAll();
  const subcategoriesList = await subcategoriesGetAll();

  return (
    <nav className={styles.container_nav}>
      <ul className={styles.categorias_lista}>
        {data?.categories?.map((category, index) => {
          return (
            <Categoria
              key={category?._id}
              category={category}
              subcategoriesList={subcategoriesList}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoriasLinks;
