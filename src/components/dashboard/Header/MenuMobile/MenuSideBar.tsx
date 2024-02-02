import React from 'react';
import styles from './MenuSideBar.module.css';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';
import Link from 'next/link';
import Image from 'next/image';

function MenuSideBar() {
  return (
    <>
      <div className={styles.sidebar}>
        <Link href={'/'} className={styles.logo}>
          <Image alt="Logo" src={'/header/Logo.svg'} width={60} height={42} />
        </Link>
        <nav className={styles.container}>
          <UlLinksUteis />
          <div className={styles.categorias}>
            <LinksCategorias />
          </div>
        </nav>
      </div>
    </>
  );
}

export default MenuSideBar;
