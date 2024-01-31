import styles from './BotaoLi.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SvgCategorias from '../svgs/SvgCategoria';

function BtnCategoria({ texto, link }: { texto: string; link?: string }) {
  const linkClean = link ?? texto?.replace(/\s+/g, '')?.toLowerCase();
  const pathname = usePathname();

  const isActive = pathname === link;

  return (
    <li className={`${styles.lista}`}>
      <Link href={`${linkClean}`} className={`${isActive ? styles.ativo : ''}`}>
        <SvgCategorias isActive={isActive} />
        {texto}
      </Link>
    </li>
  );
}

export default BtnCategoria;
