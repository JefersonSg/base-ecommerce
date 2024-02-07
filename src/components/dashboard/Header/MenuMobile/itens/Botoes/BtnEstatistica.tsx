import styles from './BotaoLi.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SvgEstatisticas from '../svgs/SvgEstatisticas';

function BtnEstatistica({ texto, link }: { texto: string; link?: string }) {
  const linkClean = link ?? texto?.replace(/\s+/g, '')?.toLowerCase();
  const pathname = usePathname();

  const isActive = pathname.includes(linkClean);

  return (
    <li className={styles.lista}>
      <Link href={`${linkClean}`} className={`${isActive ? styles.ativo : ''}`}>
        <SvgEstatisticas isActive={isActive} />
        {texto}
      </Link>
    </li>
  );
}

export default BtnEstatistica;
