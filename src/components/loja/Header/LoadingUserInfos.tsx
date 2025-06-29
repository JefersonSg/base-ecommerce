import React from 'react';
import styles from './LoadingUserInfos.module.css';
import Link from 'next/link';
import Image from 'next/image';

const LoadingUserInfos = () => {
  return (
    <div className={styles.container2}>
      <Link href={`${'/login'}`} className={styles.login}>
        <Image
          className={styles.imagem_user}
          alt="account image"
          src={'/header/account.svg'}
          width={24}
          height={24}
          unoptimized
        />
        <p className={styles.texto}>Olá, faça seu login ou cadastre-se.</p>
      </Link>
      <Link href={'/favoritos'}>
        <Image
          alt="Imagem de coração"
          src={'/header/icons/coracao.svg'}
          width={24}
          height={24}
          unoptimized
        />
      </Link>
      <Link href={'/carrinho'} className={styles.link_carrinho}>
        <Image
          alt="Imagem de carrinho"
          src={'/header/icons/carrinho.svg'}
          width={24}
          height={24}
          unoptimized
        />
      </Link>{' '}
      <button className={styles.mobile_button} aria-label="abrir menu mobile">
        Menu Mobile
      </button>
    </div>
  );
};

export default LoadingUserInfos;
