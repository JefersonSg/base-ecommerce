'use client';

import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import styles from './Likes.module.css';

import LikesAnimation from '../../../public/lottie/like/Like2.json';
import { addFavorite } from '@/src/shared/api/POST';
import { deleteFavorite } from '@/src/shared/api/DELETE';
import { getFavoriteByUserId, getUserByToken } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

interface FavoriteInterface {
  _id: string;
  productId: string;
}

const LikeLottie = ({ productId }: { productId: string }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [favoriteId, setFavoriteId] = React.useState<string>('');
  const [token, setToken] = React.useState('');
  const lottieRef = useRef<any>(null);

  const userData = useQuery<any>({
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
      return { favorites: [] };
    }
  });

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const favorite = data?.favorites?.find(
      (fav) => fav.productId === productId
    );
    if (favorite) {
      setIsFavorite(true);
      setFavoriteId(favorite._id);
      lottieRef.current?.play();
    } else {
      setIsFavorite(false);
      setFavoriteId('');
      lottieRef.current?.stop();
    }
  }, [data, productId]);

  const handleClick = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) return null;

    if (isFavorite) {
      if (!favoriteId) return null;
      try {
        await deleteFavorite(favoriteId);
        setIsFavorite(false);
        lottieRef.current?.stop();
        await refetch();
        return null;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await addFavorite(userData?.data?.user?._id, productId);
        setIsFavorite(true);
        lottieRef.current?.play();
        await refetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    // eslint-disable-next-line no-void
    <div className={styles.like} onClick={(e) => void handleClick(e)}>
      <Lottie
        lottieRef={lottieRef}
        animationData={LikesAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 30, height: 30 }}
      />
    </div>
  );
};

export default LikeLottie;
