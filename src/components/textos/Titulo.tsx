import Link from 'next/link';
import styles from './Titulo.module.css';
import Image from 'next/image';

export function Titulo({ titulo }: { titulo: string }) {
  return (
    <div className={styles.divTitulo}>
      <Link href={'/'}>
        {' '}
        <Image
          alt="Seta de voltar"
          src={'/setaVoltar.svg'}
          width={16}
          height={12}
        />
      </Link>
      <h1 className={styles.titulo}>{titulo}</h1>
    </div>
  );
}
