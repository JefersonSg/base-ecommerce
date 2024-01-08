import Link from 'next/link';
import styles from './Botao.module.css';
import Image from 'next/image';

export function Botao({
  img,
  text,
  type
}: {
  img: string;
  text: string;
  type?: string;
}) {
  return (
    <>
      <div className={styles.corpo}>
        <Link
          href={`${
            type !== undefined
              ? type === 'email'
                ? 'mailto:abayomi.make@gmail.com?subject=Suporte'
                : 'tel:+5521969871826'
              : img
          }`}
        >
          <button className={styles.buttonImg}>
            <Image
              alt={img}
              src={`/footer/${img}.png`}
              width={24}
              height={24}
            />
          </button>
          <p>{text}</p>
        </Link>
      </div>
    </>
  );
}
