import Image from 'next/image';
import styles from './MetodoPagametos.module.css';

export function MetodoPagamentos({ img }: { img: string[] }) {
  return (
    <div className={styles.divMetodosPagamentos}>
      {img.map((image) => {
        return (
          <>
            <Image
              alt={image}
              src={`footer/MetodosPagamentos/${image}.svg`}
              width={66}
              height={21}
            />
          </>
        );
      })}
    </div>
  );
}
