'use client';

import React from 'react';
import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import { InfosDestaques } from './InfosDestaques';
import Image from 'next/image';
import MenuMobile from './ButtonMenu/MenuMobile/MenuMobile';
import Link from 'next/link';

export function Header() {
  const [estaAtivo, setAtivo] = React.useState<boolean>(false);

  return (
    <>
      <InfosDestaques />
      <header className={styles.header}>
        <div className={styles.container1}>
          <ButtonMenu setAtivo={setAtivo} />
          <Image
            alt="Lupa"
            src={'header/icons/lupa.svg'}
            width={24}
            height={24}
          />
        </div>
        <Link href={'/'} className={styles.logo}>
          <Image alt="Logo" src={'/header/Logo.svg'} width={60} height={42} />
        </Link>
        <div className={styles.container2}>
          <Image
            alt="Imagem de coração"
            src={'header/icons/coracao.svg'}
            width={24}
            height={24}
          />
          <Image
            alt="Imagem de carrinho"
            src={'header/icons/carrinho.svg'}
            width={24}
            height={24}
          />
        </div>
        {estaAtivo && <MenuMobile setAtivo={setAtivo} />}
      </header>
    </>
  );
}
