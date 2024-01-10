import Image from 'next/image';
import styles from './InfosDestaques.module.css';

export function InfosDestaques() {
  return (
    <>
      <div className={styles.infos}>
        <Image alt="Pix" src={'header/PIX.svg'} width={15} height={15} />
        <p className={styles.texto}>
          Parcele suas compras em até <span>10x sem juros!</span>
        </p>
      </div>
    </>
  );
}
