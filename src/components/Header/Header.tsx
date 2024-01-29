'use client';

import React from 'react';
import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import { InfosDestaques } from './InfosDestaques';
import Image from 'next/image';
import MenuMobile from './ButtonMenu/MenuMobile/MenuMobile';
import Link from 'next/link';
import Pesquisa from './pesquisa/Pesquisa';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getUser } from '@/src/shared/api/api';

const queryClient = new QueryClient();

interface User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
}

export function Header() {
  const [estaAtivo, setAtivo] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<User | null>(null);

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
    const fetchData = async () => {
      try {
        const data = await getUser();
        setUserData(data.currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchData();
  }, []);

  return (
    <>
      <InfosDestaques />
      <QueryClientProvider client={queryClient}>
        <header className={styles.header}>
          <div className={styles.container1}>
            <ButtonMenu setAtivo={setAtivo} />
            <Pesquisa />
          </div>
          <Link href={'/'} className={styles.logo}>
            <Image alt="Logo" src={'/header/Logo.svg'} width={60} height={42} />
          </Link>
          <div className={styles.container2}>
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
          {estaAtivo && (
            <MenuMobile
              userData={userData}
              ativo={estaAtivo}
              setAtivo={setAtivo}
            />
          )}
        </header>
      </QueryClientProvider>
    </>
  );
}
