import React from 'react';
import styles from './Links.module.css';
import { useQuery } from '@tanstack/react-query';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import { getAllCategories } from '@/src/shared/api/GETS';

const Links = () => {
  const { data } = useQuery<{ categories: CategoryInterface[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  return (
    <>
      {data?.categories?.map((category) => {
        return (
          <div className={styles.container_links} key={category?._id}>
            Links
          </div>
        );
      })}
    </>
  );
};

export default Links;
