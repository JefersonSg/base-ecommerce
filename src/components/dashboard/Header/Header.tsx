'use client';

import React from 'react';
import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import Image from 'next/image';
import MenuMobile from './MenuMobile/MenuMobile';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getUserByToken } from '@/src/shared/api/GETS';
import useMedia from '@/src/shared/hooks/useMedia';
import MenuSideBar from './MenuMobile/MenuSideBar';

export function Header() {
  const [estaAtivo, setAtivo] = React.useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUserByToken
  });

  const mobile = useMedia('(max-width: 64rem)');

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

  return (
    <>
      <header className={styles.header}>
        {mobile && (
          <>
            <div className={styles.container1}>
              <ButtonMenu setAtivo={setAtivo} ativo={estaAtivo} />
            </div>

            <Link href={'/'} className={styles.logo}>
              <Image
                alt="Logo"
                src={'/header/Logo.svg'}
                width={60}
                height={42}
              />
            </Link>
          </>
        )}
        <div className={styles.container2}>
          <Link href={'/dashboard/settings'}>
            <Image
              className={styles.iconSetting}
              alt="Imagem de carrinho"
              src={'/header/icons/config.svg'}
              width={20}
              height={20}
            />
          </Link>
        </div>
      </header>
      {estaAtivo && (
        <MenuMobile
          userData={data?.currentUser}
          ativo={estaAtivo}
          setAtivo={setAtivo}
        />
      )}
      {!mobile && <MenuSideBar />}
    </>
  );
}
