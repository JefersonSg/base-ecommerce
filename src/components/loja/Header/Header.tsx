import React, { Suspense } from 'react';
import styles from './Header.module.css';
import { InfosDestaques } from './InfosDestaques';
import Image from 'next/image';
import Link from 'next/link';
import Pesquisa from './pesquisa/Pesquisa';
import CategoriasLinks from './nav/CategoriasLinks';
import UserInfo from './UserInfo';

export const Header = async () => {
  return (
    <div className={styles.container_header}>
      <InfosDestaques />
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
        <Suspense>
          <UserInfo />
        </Suspense>
      </header>
      <Suspense>
        <CategoriasLinks />
      </Suspense>
    </div>
  );
};
