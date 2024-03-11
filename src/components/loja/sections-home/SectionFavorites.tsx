'use client';

import React from 'react';
import styles from './Section.module.css';
import { type FavoriteInterface } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import Produto from '../card-product/Produto';
import {
  getFavoriteByUserId,
  getFavoritesProducts
} from '@/src/shared/api/GETS';
import { usePathname } from 'next/navigation';

const SectionFavorites = () => {
  const pathname = usePathname();
  const userData: any = useQuery({
    queryKey: ['user']
  });

  const favorites = useQuery<{ favorites: FavoriteInterface[] }>({
    queryKey: ['favorites', userData?.data?.user?._id ?? 0],
    queryFn: async () => {
      if (userData?.data?.user?.name) {
        return await getFavoriteByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });

  const { data, refetch } = useQuery({
    queryKey: ['products-favorites', favorites?.data?.favorites?.[0]?.userId],
    queryFn: async () => {
      return await getFavoritesProducts(favorites?.data?.favorites);
    }
  });

  React.useEffect(() => {
    async function refetchItems() {
      await refetch();
    }
    void refetchItems();
  }, [pathname, refetch]);

  return (
    <div className={styles.section}>
      <div className={`${styles.gallery_layout_container} ${styles.favorites}`}>
        {data?.map(
          (product, index) =>
            index <= 3 && (
              <Produto
                key={product._id}
                _id={product._id}
                link={product._id}
                name={product.name}
                price={product.price.toFixed(2).toString().replace('.', ',')}
                promotion={product.promotion}
                img={product.images}
              />
            )
        )}
      </div>
    </div>
  );
};

export default SectionFavorites;
