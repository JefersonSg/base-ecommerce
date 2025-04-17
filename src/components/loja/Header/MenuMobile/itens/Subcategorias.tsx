'use client';

import {
  type subcategoryInterface,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './Subcategorias.module.css';
import Link from 'next/link';

const Subcategorias = ({
  category,
  setAtivo,
  subcategories
}: {
  category: CategoryInterface;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  subcategories: { subcategories: subcategoryInterface[] };
}) => {
  return (
    <div className={styles.subcategorias_lista}>
      <ul>
        <li>
          <Link
            onClick={() => {
              setAtivo(false);
            }}
            href={{
              pathname: '/produtos/categoria',
              query: { _id: category._id }
            }}
          >
            <p>{category.name}</p>
          </Link>
        </li>
        {subcategories?.subcategories?.map((subcategory) => {
          return (
            <li key={subcategory._id}>
              <Link
                onClick={() => {
                  setAtivo(false);
                }}
                href={{
                  pathname: '/produtos/subcategoria',
                  query: { _id: subcategory._id }
                }}
              >
                {subcategory?.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Subcategorias;
