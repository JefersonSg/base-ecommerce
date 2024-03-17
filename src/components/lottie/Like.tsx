/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import Lottie from 'react-lottie';
import styles from './Likes.module.css';

// Arquivos Lottie
import Likes from '../../../public/lottie/like/Like2.json';
import { addFavorite } from '@/src/shared/api/CREATE';
import { type FavoriteInterface } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { deleteFavorite } from '@/src/shared/api/DELETE';
import { getFavoriteByUserId, getUserByToken } from '@/src/shared/api/GETS';
import Cookies from 'js-cookie';

const Like = ({ productId }: { productId: string }) => {
  const [isFavorites, setIsFavorite] = React.useState(false);
  const [favoriteId, setFavoriteId] = React.useState<string>('');
  const [token, setToken] = React.useState('');

  const [paused, setPaused] = React.useState(true);
  const [stope, setStope] = React.useState(true);

  const userData: any = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await getUserByToken();
    }
  });

  const { data, refetch } = useQuery<{ favorites: FavoriteInterface[] }>({
    queryKey: ['favorites', userData?.data?.user?._id ?? 0],
    queryFn: async () => {
      if (userData?.data?.user?.name) {
        return await getFavoriteByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });

  const animation = Likes;

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animation
  };

  React.useEffect(() => {
    let already = false;
    data?.favorites?.forEach((favorite) => {
      if (favorite?.productId === productId) {
        setIsFavorite(true);
        setFavoriteId(favorite?._id);
        already = true;
      }
    });

    if (already) {
      setPaused(false);
      setStope(false);
    }
  }, [data, productId]);

  // get token
  React.useEffect(() => {
    const token = Cookies.get('auth_token');

    if (token) {
      setToken(token);
    }
  }, []);

  async function addNewFavorite() {
    if (!isFavorites) {
      try {
        const response = await addFavorite(
          userData?.data?.user?._id,
          productId
        );
        setIsFavorite(true);
        await refetch();

        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function removeFavorite() {
    if (isFavorites) {
      try {
        if (!favoriteId) return;
        const response = await deleteFavorite(favoriteId);

        setIsFavorite(false);
        await refetch();

        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div
      className={styles.like}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (token) {
          await removeFavorite();

          await addNewFavorite();
          if (paused && stope) {
            setPaused(false);
            setStope(false);
          } else {
            setPaused(true);
            setStope(true);
          }
        }
      }}
    >
      <Lottie
        options={defaultOptions}
        width={30}
        height={30}
        isPaused={paused}
        isStopped={stope}
      />
    </div>
  );
};

export default Like;
