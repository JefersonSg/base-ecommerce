'use client';

import React from 'react';
import { isAdmin } from '@/src/actions/isAdmin';
import setNewCookieSession from '@/src/actions/setCookieSession';
import { getAllItemsCartByUserId } from '@/src/shared/api/GETS';
import {
  type UserInterface,
  type CartInterface
} from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import DropdownMenu from './DropdownMenu';

const Container2 = ({ userData }: { userData: UserInterface }) => {
  const [admin] = React.useState(userData?.isAdmin);
  const [ativo, setAtivo] = React.useState(false);

  React.useEffect(() => {
    if (admin) {
      void isAdmin(userData?.user?._id);
    }
    void setNewCookieSession();
  }, [admin, userData?.user?._id]);

  const { data } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData?.user?._id],
    queryFn: async () => {
      if (userData?.user?._id) {
        return await getAllItemsCartByUserId(userData.user._id);
      }
      return [];
    }
  });

  return (
    <div className={styles.container2}>
      <div
        className={styles.login}
        onMouseEnter={() => {
          setAtivo(true);
        }}
        onMouseLeave={(e) => {
          setAtivo(false);
        }}
      >
        <Link
          className={styles.login}
          href={`${userData?.user ? '/minha-conta' : '/login'}`}
        >
          <Image
            className={styles.imagem_user}
            alt="account image"
            src={userData?.user?.image ?? '/header/account.svg'}
            width={24}
            height={24}
          />
          <p>
            {userData?.user
              ? 'Olá ' +
                userData?.user?.name?.split(' ')?.[0] +
                ' ' +
                userData?.user?.surname?.split(' ')?.[0] +
                ` ${
                  userData?.user?.surname?.split(' ')?.[1]?.length > 2
                    ? userData?.user?.surname?.split(' ')?.[1]
                    : ''
                }`
              : 'Olá, faça seu login ou cadastre-se.'}
          </p>
        </Link>
        {userData?.user?.name && ativo ? (
          <div className={styles.dropdownMenu}>
            <DropdownMenu nomeUser={userData.user.name} />
          </div>
        ) : (
          <></>
        )}
      </div>

      {userData?.isAdmin && (
        <Link href={'/dashboard'} className={styles.button_dashboard}>
          <Image
            alt="Imagem do dashboard"
            src={'/header/icons/dashboard.svg'}
            width={24}
            height={24}
          />
        </Link>
      )}
      <Link href={'/favoritos'}>
        <Image
          alt="Imagem de coração"
          src={'/header/icons/coracao.svg'}
          width={24}
          height={24}
        />
      </Link>
      <Link href={'/carrinho'} className={styles.link_carrinho}>
        {data?.itemsCart && data?.itemsCart?.length > 0 && (
          <span className={styles.total_itens_carrinho}>
            {data?.itemsCart.length}
          </span>
        )}
        <Image
          alt="Imagem de carrinho"
          src={'/header/icons/carrinho.svg'}
          width={24}
          height={24}
        />
      </Link>
    </div>
  );
};

export default Container2;
