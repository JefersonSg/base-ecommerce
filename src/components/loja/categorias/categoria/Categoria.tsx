import Image from 'next/image';
import styles from './Categoria.module.css';
import Link from 'next/link';

function Categoria({
  nome,
  img,
  link,
  pathname
}: {
  nome: string;
  img: string;
  link: string;
  pathname: string;
}) {
  return (
    <Link
      href={{ pathname: `/produtos/${pathname}`, query: { _id: link } }}
      className={styles.categoria}
    >
      <div className={styles.div_img}>
        <Image
          className={styles.imagemCategoria}
          alt={`imagem da categoria ${nome}`}
          src={img}
          width={104}
          height={104}
          quality={80}
          placeholder="blur"
          blurDataURL={img}
          sizes="500px"
        />
      </div>
      <span>{nome}</span>
    </Link>
  );
}

export default Categoria;
