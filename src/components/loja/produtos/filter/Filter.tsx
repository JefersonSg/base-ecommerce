import React from 'react';
import styles from './Filtes.module.css';
import { useQuery } from '@tanstack/react-query';
import categoriesGetAll from '@/src/actions/category-get-all';
import subcategoriesGetAll from '@/src/actions/subcategory-get-all';

const Filter = () => {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesGetAll
  });
  const subcategories = useQuery({
    queryKey: ['subcategories'],
    queryFn: subcategoriesGetAll
  });

  return (
    <div className={styles.filter_container}>
      <h2 className={styles.titulo_filter}>Filtrar por</h2>
      <nav className={`${styles.filter} ${styles.filter_category}`}>
        <p>Categorias</p>
        <ul>
          {categories.data?.categories.map((category) => {
            return <li key={category._id}>{category?.name}</li>;
          })}
        </ul>
      </nav>
      <nav className={`${styles.filter} ${styles.filter_subcategory}`}>
        <p>Subcategorias</p>
        <ul>
          {subcategories.data?.subcategories.map((subcategory) => {
            return <li key={subcategory._id}>{subcategory?.name}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Filter;
