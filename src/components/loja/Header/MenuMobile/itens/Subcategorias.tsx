'use client';

import { getSubcategoryByCategory } from '@/src/shared/api/GETS';
import {
  type CategoryInterface,
  type subcategoryInterface
} from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styles from './Subcategorias.module.css';
import Link from 'next/link';

const Subcategorias = ({
  category,
  setAtivo
}: {
  category: CategoryInterface;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data } = useQuery<{ subcategories: subcategoryInterface[] }>({
    queryKey: ['subcategories', category._id],
    queryFn: async () => {
      return await getSubcategoryByCategory(category._id);
    }
  });

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
        {data?.subcategories?.map((subcategory) => {
          return (
            <li key={subcategory._id}>
              <Link
                onClick={() => {
                  setAtivo(false);
                }}
                href={{
                  pathname: 'subcategoria',
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
