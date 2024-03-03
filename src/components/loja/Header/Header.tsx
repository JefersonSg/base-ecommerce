'use client';

import React from 'react';
import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import { InfosDestaques } from './InfosDestaques';
import Image from 'next/image';
import MenuMobile from './MenuMobile/MenuMobile';
import Link from 'next/link';
import Pesquisa from './pesquisa/Pesquisa';
import { useQuery } from '@tanstack/react-query';
import { getUserByToken } from '@/src/shared/api/GETS';
import CategoriasLinks from './nav/CategoriasLinks';
import useMedia from '@/src/shared/hooks/useMedia';
import { type UserInterface } from '@/src/shared/helpers/interfaces';

export function Header() {
  const [estaAtivo, setAtivo] = React.useState<boolean>(false);

  const { data } = useQuery<{ user: UserInterface; isAdmin: boolean }>({
    queryKey: ['user'],
    queryFn: getUserByToken
  });

  const mobile = useMedia('(max-width: 64rem)');

  console.log(data);
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
    <div className={styles.container_header}>
      <InfosDestaques />
      <header className={styles.header}>
        <div className={styles.container1}>
          {mobile && <ButtonMenu setAtivo={setAtivo} />}
          <Pesquisa />
        </div>
        <Link href={'/'} className={styles.logo}>
          <Image alt="Logo" src={'/header/Logo.svg'} width={60} height={42} />
        </Link>
        <div className={styles.container2}>
          {!mobile && (
            <Link
              href={`${data?.user ? '/minha-conta' : '/login'}`}
              className={styles.login}
            >
              <Image
                alt="account image"
                src={'/header/account.svg'}
                width={24}
                height={24}
              />
              <p>
                {data?.user
                  ? 'Olá ' + data.user.name + ' ' + data.user.surname
                  : 'Olá, faça seu login ou cadastre-se.'}
              </p>
            </Link>
          )}
          {data?.isAdmin && !mobile && (
            <Link href={'/dashboard'}>
              <Image
                alt="Imagem de coração"
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
      <CategoriasLinks />
      {estaAtivo && mobile && (
        <MenuMobile ativo={estaAtivo} setAtivo={setAtivo} />
      )}
    </div>
  );
}
