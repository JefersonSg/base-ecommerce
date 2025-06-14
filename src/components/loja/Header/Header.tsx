import React, { Suspense } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Pesquisa from './pesquisa/Pesquisa';
import CategoriasLinks from './nav/CategoriasLinks';
import UserInfo from './UserInfo';
import LoadingUserInfos from './LoadingUserInfos';
import { InfosDestaques } from './InfosDestaques';

export const Header = async () => {
  return (
    <>
      <InfosDestaques />
      <div className={styles.container_header}>
        <header className={styles.header}>
          <div className={styles.container1}>
            <Pesquisa />
          </div>
          <Link href={'/'} className={styles.logo}>
            <Image
              className={styles.foto_logo}
              alt="Logo"
              src={'/header/Logo.svg'}
              width={100}
              height={83}
            />
          </Link>

          <Suspense fallback={<LoadingUserInfos />}>
            <UserInfo />
          </Suspense>
        </header>
        <div className={styles.pesquisa_mobile}>
          <Pesquisa />
        </div>
        <Suspense>
          <CategoriasLinks />
        </Suspense>
      </div>
    </>
  );
};
