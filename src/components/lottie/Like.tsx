/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import Lottie from 'react-lottie';
import styles from './Likes.module.css';

import LikesAnimation from '../../../public/lottie/like/Like2.json';
import { addFavorite } from '@/src/shared/api/POST';
import {
  type UserInterface,
  type FavoriteInterface
} from '@/src/shared/helpers/interfaces';
import { getFavoriteByUserId, getUserByToken } from '@/src/shared/api/GETS';
import { deleteFavorite } from '@/src/shared/api/DELETE';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

const Like = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const token = Cookies.get('auth_token');

  const { data: userData } = useQuery<UserInterface | undefined>({
    queryKey: ['user'],
    queryFn: async () => {
      return await getUserByToken();
    },
    enabled: !!token
  });

  const { data: favoritesData } = useQuery<{ favorites: FavoriteInterface[] }>({
    queryKey: ['favorites', userData?.user?._id],
    queryFn: async () => {
      if (userData?.user?._id) {
        return await getFavoriteByUserId(userData?.user?._id);
      }
      return undefined;
    },
    enabled: !!userData?.user._id
  });

  const favorite = favoritesData?.favorites?.find(
    (fav) => fav.productId === productId
  );

  React.useEffect(() => {
    if (favorite) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [favorite]);

  const toggleFavorite = async () => {
    if (!userData) return;

    try {
      if (favorite) {
        await deleteFavorite(favorite._id);
      } else {
        await addFavorite(userData.user._id, productId);
      }

      await queryClient.invalidateQueries({
        queryKey: ['favorites', userData.user._id]
      });
      setIsPlaying(!favorite);
    } catch (error) {
      console.error(error);
    }
  };

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: LikesAnimation
  };

  return (
    <div
      className={styles.like}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (token) {
          await toggleFavorite();
        }
      }}
    >
      <Lottie
        options={defaultOptions}
        width={30}
        height={30}
        isPaused={!isPlaying}
        isStopped={!isPlaying}
      />
    </div>
  );
};

export default Like;
