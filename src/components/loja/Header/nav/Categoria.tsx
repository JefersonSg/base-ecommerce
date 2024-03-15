import React from 'react';
import {
  type subcategoryInterface,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import SvgSetaBaixo from '../svgs/SvgSetaBaixo';
import styles from './Links.module.css';
import Subcategorias from './Subcategorias';

const Categoria = ({
  category,
  subcategoriesList
}: {
  category: CategoryInterface;
  subcategoriesList: { subcategories: subcategoryInterface[] };
}) => {
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
      {subcategoriesList?.subcategories?.[0] && viewActive && (
        <Subcategorias
          data={subcategoriesList.subcategories}
          category={category}
        />
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
