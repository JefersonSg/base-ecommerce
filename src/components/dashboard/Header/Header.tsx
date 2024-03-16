'use client';

import React from 'react';
import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import Image from 'next/image';
import MenuMobile from './MenuMobile/MenuMobile';
import Link from 'next/link';
import MenuSideBar from './MenuMobile/MenuSideBar';

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
    <div className={styles.header_container}>
      <header className={styles.header_dashboard}>
        <>
          <div className={styles.container1}>
            <ButtonMenu setAtivo={setAtivo} ativo={estaAtivo} />
          </div>

          <Link
            href={'/dashboard'}
            className={`${styles.logo} ${styles.mobile}`}
          >
            <Image alt="Logo" src={'/header/Logo.svg'} width={60} height={42} />
          </Link>
        </>
        <div className={styles.container2}>
          <Link href={'/dashboard/settings'}>
            <Image
              className={styles.iconSetting}
              alt="Imagem de carrinho"
              src={'/header/icons/config.svg'}
              width={20}
              height={20}
              quality={60}
            />
          </Link>
        </div>
      </header>
      {estaAtivo && <MenuMobile setAtivo={setAtivo} />}
      <MenuSideBar setAtivo={setAtivo} />
    </div>
  );
}
