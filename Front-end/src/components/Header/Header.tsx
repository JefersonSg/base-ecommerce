'use client';

import React from 'react';
import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import { InfosDestaques } from './InfosDestaques';
import Image from 'next/image';
import MenuMobile from './ButtonMenu/MenuMobile/MenuMobile';
import Link from 'next/link';
import Pesquisa from './pesquisa/Pesquisa';

export function Header() {
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

  return (
    <>
      <InfosDestaques />
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
        {estaAtivo && <MenuMobile ativo={estaAtivo} setAtivo={setAtivo} />}
      </header>
    </>
  );
}
