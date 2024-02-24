'use client';

import React from 'react';
import styles from './Links.module.css';
import { useQuery } from '@tanstack/react-query';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import { getAllCategories } from '@/src/shared/api/GETS';
import SvgSetaBaixo from '../svgs/SvgSetaBaixo';

const Links = () => {
  const { data } = useQuery<{ categories: CategoryInterface[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  return (
    <nav className={styles.container_nav}>
      <ul>
        {data?.categories?.map((category) => {
          return (
            <li className={styles.link} key={category?._id}>
              <p>{category.name}</p>
              <SvgSetaBaixo />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Links;
