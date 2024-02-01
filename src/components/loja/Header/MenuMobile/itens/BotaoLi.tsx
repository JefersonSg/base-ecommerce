import Image from 'next/image';
import styles from './BotaoLi.module.css';
import Link from 'next/link';

function BotaoLi({
  texto,
  image,
  link
}: {
  texto: string;
  image?: string;
  link: string;
}) {
  return (
    <li className={styles.lista}>
      <Link href={`/${link}`}>
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
    </li>
  );
}

export default BotaoLi;
