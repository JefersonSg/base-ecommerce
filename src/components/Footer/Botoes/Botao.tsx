import styles from './Botao.module.css';
import Image from 'next/image';

export function Botao({ img, text }: { img: string; text: string }) {
  return (
    <>
      <div className={styles.corpo}>
        <button className={styles.buttonImg}>
          <Image alt={img} src={`/footer/${img}.png`} width={24} height={24} />
        </button>
        <p>{text}</p>
      </div>
    </>
  );
}
