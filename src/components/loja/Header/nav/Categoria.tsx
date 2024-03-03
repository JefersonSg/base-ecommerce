import React from 'react';
import {
  type subcategoryInterface,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import SvgSetaBaixo from '../svgs/SvgSetaBaixo';
import styles from './Links.module.css';
import { useQuery } from '@tanstack/react-query';
import { getSubcategoryByCategory } from '@/src/shared/api/GETS';
import Subcategorias from './Subcategorias';

const Categoria = ({ category }: { category: CategoryInterface }) => {
  const { data } = useQuery<{ subcategories: subcategoryInterface[] }>({
    queryKey: ['subcategories', category.name],
    queryFn: async () => {
      return await getSubcategoryByCategory(category._id);
    }
  });
  const [viewActive, setViewActive] = React.useState(false);
  return (
    <li
      className={styles.link}
      key={category?._id}
      onMouseEnter={() => {
        setViewActive(true);
      }}
      onMouseLeave={() => {
        setViewActive(false);
      }}
    >
      <p>{category.name}</p>
      <SvgSetaBaixo />
      {data && viewActive && (
        <Subcategorias data={data.subcategories} category={category} />
      )}
      {viewActive && (
        <div
          className={styles.background}
          onMouseEnter={() => {
            setViewActive(false);
          }}
        ></div>
      )}
    </li>
  );
};

export default Categoria;
