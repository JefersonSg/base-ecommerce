import Image from 'next/image';
import styles from './BotaoLi.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// interface SvgComponents extends React.SVGProps<SVGSVGElement> {
//   fill?: string;
//   stroke?: string;
// }
function BotaoLi({
  texto,
  image,
  link,
  setAtivo
}: {
  texto: string;
  image?: string;
  link?: string;
  setAtivo?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const linkClean = link ?? texto?.replace(/\s+/g, '')?.toLowerCase();
  const pathname = usePathname();

  const linkActiveClean = pathname?.replaceAll('/', '')?.replaceAll(' ', '');
  const linkInsertClean = linkClean?.replaceAll('/', '')?.replaceAll(' ', '');

  return (
    <li
      className={styles.lista}
      onClick={() => {
        if (setAtivo) {
          setAtivo(false);
        }
      }}
    >
      <Link
        href={`/dashboard/${linkClean}`}
        className={`${linkActiveClean === linkInsertClean ? styles.ativo : ''}`}
      >
        {image && (
          <Image
            alt={`imagem de ${image}`}
            src={`/header/Menu/${image}.svg`}
            width={20}
            height={20}
            unoptimized
          />
        )}

        {texto}
      </Link>
    </li>
  );
}

export default BotaoLi;
