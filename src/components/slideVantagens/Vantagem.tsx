import Image from 'next/image';
import styles from './Vantagem.module.css';
import Link from 'next/link';

function Vantagem({
  titulo,
  texto,
  image,
  link
}: {
  titulo: string;
  texto: string;
  image: string;
  link?: string;
}) {
  return (
    <Link href={`/${link ?? ''}`} className={styles.vantagem}>
      <Image
        className={styles.imagem}
        alt={`imagem de ${image}`}
        src={`/banner/vantagens/${image}.svg`}
        width={65}
        height={35}
      />
      <div>
        <h2>{titulo}</h2>
        <p>{texto}</p>
      </div>
    </Link>
  );
}

export default Vantagem;
