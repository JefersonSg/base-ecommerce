'use client';

import React from 'react';
import styles from './Links.module.css';
import { useQuery } from '@tanstack/react-query';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import { getAllCategories } from '@/src/shared/api/GETS';
import Categoria from './Categoria';

const CategoriasLinks = () => {
  const { data } = useQuery<{ categories: CategoryInterface[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  return (
    <nav className={styles.container_nav}>
      <ul className={styles.categorias_lista}>
        {data?.categories?.map((category) => {
          return <Categoria key={category._id} category={category} />;
        })}
      </ul>
    </nav>
  );
};

export default CategoriasLinks;
