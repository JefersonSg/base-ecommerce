import Image from 'next/image';
import styles from './BotaoLi.module.css';
import Link from 'next/link';

function BotaoLi({
  texto,
  image,
  pathname,
  query
}: {
  texto: string;
  image?: string;
  pathname: string;
  query?: string;
}) {
  return (
    <li className={styles.lista}>
      {query && (
        <Link href={{ pathname, query: { _id: query } }}>
          {image && (
            <Image
              alt={`imagem de ${image}`}
              src={`/header/Menu/${image}.svg`}
              width={24}
              height={24}
            />
          )}
          {texto}
        </Link>
      )}
      {!query && (
        <Link href={{ pathname }}>
          {image && (
            <Image
              alt={`imagem de ${image}`}
              src={`/header/Menu/${image}.svg`}
              width={24}
              height={24}
            />
          )}
          {texto}
        </Link>
      )}
    </li>
  );
}

export default BotaoLi;
