'use client';

import React, { Suspense } from 'react';
import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import { InfosDestaques } from './InfosDestaques';
import Image from 'next/image';
import MenuMobile from './MenuMobile/MenuMobile';
import Link from 'next/link';
import Pesquisa from './pesquisa/Pesquisa';
import CategoriasLinks from './nav/CategoriasLinks';
import {
  type CategoryInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import { type subcategoriesListByCategory } from '@/src/app/(loja)/layout';
import { isAdmin } from '@/src/actions/isAdmin';

export function Header({
  userData,
  categories,
  subcategoriesList
}: {
  userData: UserInterface;
  categories: {
    categories: CategoryInterface[];
  };
  subcategoriesList: subcategoriesListByCategory;
}) {
  const [estaAtivo, setAtivo] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (estaAtivo) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [estaAtivo]);

  React.useEffect(() => {
    if (userData.isAdmin) {
      void isAdmin(userData?.user?._id);
    }
  }, [userData]);

  return (
    <div className={styles.container_header}>
      <InfosDestaques />
      <header className={styles.header}>
        <div className={styles.container1}>
          <ButtonMenu setAtivo={setAtivo} />
          <Pesquisa />
        </div>
        <Link href={'/'} className={styles.logo}>
          <Image alt="Logo" src={'/header/Logo.svg'} width={100} height={83} />
        </Link>
        <div className={styles.container2}>
          <Link
            href={`${userData?.user ? '/minha-conta' : '/login'}`}
            className={styles.login}
          >
            <Image
              className={styles.imagem_user}
              alt="account image"
              src={userData.user?.image ?? '/header/account.svg'}
              width={24}
              height={24}
            />
            <p>
              {userData?.user
                ? 'Olá ' +
                  userData?.user?.name +
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
          {userData?.isAdmin && (
            <Link href={'/dashboard'} className={styles.button_dashboard}>
              <Image
                alt="Imagem do dashboard"
                src={'/header/Menu/dashboard.svg'}
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
          <Link href={'/carrinho'}>
            <Image
              alt="Imagem de carrinho"
              src={'/header/icons/carrinho.svg'}
              width={24}
              height={24}
            />
          </Link>
        </div>
      </header>
      <Suspense>
        <CategoriasLinks
          categories={categories}
          subcategoriesList={subcategoriesList}
        />
      </Suspense>
      {estaAtivo && (
        <Suspense>
          <MenuMobile
            userData={userData}
            ativo={estaAtivo}
            setAtivo={setAtivo}
            categories={categories}
            subcategoriesList={subcategoriesList}
          />
        </Suspense>
      )}
    </div>
  );
}
