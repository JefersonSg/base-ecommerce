import React from 'react';
import Image from 'next/image';
import styles from './InfosDestaques.module.css';
import Link from 'next/link';

export function InfosDestaques() {
  return (
    <div className={styles.infos}>
      <Link href={'/pagina/formas-de-pagamento'}>
        <Image alt="Pix" src={'/header/PIX.svg'} width={15} height={15} />

        <p className={styles.texto}>
          Parcele suas compras em até 10x
          {/* <span> sem juros!</span> */}
        </p>
      </Link>
    </div>
  );
}
