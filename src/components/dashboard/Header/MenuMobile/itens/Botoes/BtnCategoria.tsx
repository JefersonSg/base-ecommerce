import styles from './BotaoLi.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import SvgCategorias from '../svgs/SvgCategoria';

function BtnCategoria({
  texto,
  link,
  setAtivo
}: {
  texto: string;
  link?: string;
  setAtivo?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const linkClean = link ?? texto?.replace(/\s+/g, '')?.toLowerCase();
  const pathname = usePathname();

  const isActive = pathname.includes(linkClean);

  return (
    <li
      className={styles.lista}
      onClick={() => {
        if (setAtivo) {
          setAtivo(false);
        }
      }}
    >
      <Link href={`${linkClean}`} className={`${isActive ? styles.ativo : ''}`}>
        <SvgCategorias isActive={isActive} />
        {texto}
      </Link>
    </li>
  );
}

export default BtnCategoria;
