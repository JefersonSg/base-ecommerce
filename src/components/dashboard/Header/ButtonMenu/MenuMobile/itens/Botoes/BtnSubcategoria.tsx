import styles from './BotaoLi.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SvgSubcategorias from '../svgs/SvgSubcategoria';

function BtnSubcategoria({ texto, link }: { texto: string; link?: string }) {
  const linkClean = link ?? texto?.replace(/\s+/g, '')?.toLowerCase();
  const pathname = usePathname();

  const isActive = pathname === `/${linkClean}`;

  console.log(linkClean);
  console.log(pathname);

  return (
    <li className={styles.lista}>
      <Link href={`${linkClean}`} className={`${isActive ? styles.ativo : ''}`}>
        <SvgSubcategorias isActive={isActive} />

        {texto}
      </Link>
    </li>
  );
}

export default BtnSubcategoria;
