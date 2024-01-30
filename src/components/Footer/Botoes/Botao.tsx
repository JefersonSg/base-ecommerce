import Link from 'next/link';
import styles from './Botao.module.css';
import Image from 'next/image';

export function Botao({
  img,
  text,
  type,
  link,
}: {
  img: string;
  text: string;
  type?: string;
  link?: string;
}) {
  return (
    <li className={styles.corpo}>
      <Link
        href={`${
          type !== undefined
            ? type === 'email'
              ? 'mailto:abayomi.make@gmail.com?subject=Suporte'
              : 'tel:+5521969871826'
            : link
        }`}
      >
        <button className={styles.button_img}>
          <Image alt={img} src={`/footer/${img}.png`} width={24} height={24} />
        </button>
        <p>{text}</p>
      </Link>
    </li>
  );
}
