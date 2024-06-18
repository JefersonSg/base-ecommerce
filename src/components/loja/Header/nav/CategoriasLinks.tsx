'use client';

import styles from './Links.module.css';
import {
  type subcategoryInterface,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import Categoria from './Categoria';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getAllSubcategories } from '@/src/shared/api/GETS';

const CategoriasLinks = () => {
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
    <nav className={styles.container_nav}>
      <ul className={styles.categorias_lista}>
        {data?.categories?.map((category, index) => {
          return (
            <Categoria
              key={category?._id}
              category={category}
              subcategoriesList={subcategoriesList?.data}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoriasLinks;
