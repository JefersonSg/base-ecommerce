import React from 'react';
import styles from './MenuSideBar.module.css';
import UlLinksUteis from './itens/UlLinksUteis';
import LinksCategorias from './itens/LinksCategorias';
import Link from 'next/link';
import Image from 'next/image';

function MenuSideBar({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.sidebar}>
      <Link href={'/dashboard'} className={styles.logo}>
        <Image
          alt="Logo"
          src={'/header/dashboard/logo.svg'}
          width={60}
          height={42}
        />
      </Link>
      <nav className={styles.container}>
        <UlLinksUteis setAtivo={setAtivo} />
        <div className={styles.categorias}>
          <LinksCategorias setAtivo={setAtivo} />
        </div>
      </nav>
    </div>
  );
}

export default MenuSideBar;
