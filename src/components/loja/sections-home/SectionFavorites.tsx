'use client';

import React from 'react';
import styles from './sectionFavorites.module.css';
import { type FavoriteInterface } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import Produto from '../card-product/Produto';
import {
  getFavoriteByUserId,
  getFavoritesProducts,
  getUserByToken
} from '@/src/shared/api/GETS';
import { usePathname } from 'next/navigation';
import { Titulo } from '../../compartilhado/textos/Titulo';
import Cookies from 'js-cookie';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';
import LoadingAnimation from '../../compartilhado/loading/loadingAnimation';
import CreateAccount from '../../compartilhado/modals/CreateAccount';

const SectionFavorites = () => {
  const pathname = usePathname();
  const token = Cookies.get('auth_token');
  const userData: any = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return await getUserByToken(token);
    }
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  const favorites = useQuery<{ favorites: FavoriteInterface[] }>({
    queryKey: ['favorites' + userData?.data?.user?._id ?? 0],
    queryFn: async () => {
      if (userData?.data?.user?.name) {
        return await getFavoriteByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });

  const { data, refetch } = useQuery({
    queryKey: ['products-favorites' + favorites?.data?.favorites?.[0]?.userId],
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
    <>
      <div className={styles.section}>
        <Titulo titulo="Seus favoritos" />

        <div className={`${styles.favorites}`}>
          {data?.map((product, index) => (
            <Produto
              setMessagePopUp={setMessagePopUp}
              setTypePopUp={setTypePopUp}
              key={product._id}
              productData={product}
              setIsLoading={setIsLoading}
              setModalLogin={setModalLogin}
            />
          ))}
        </div>
      </div>
      {textPopUp && (
        <PopUpMessage
          text={textPopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {isLoading && <LoadingAnimation />}
      {modalLogin && <CreateAccount setState={setModalLogin} />}
    </>
  );
};

export default SectionFavorites;
