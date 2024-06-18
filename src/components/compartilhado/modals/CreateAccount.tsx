'use client';

import Image from 'next/image';
import React from 'react';
import styles from './createAccount.module.css';
import Link from 'next/link';
import BtnFechar from '../botoes/BtnFechar';

const CreateAccount = ({
  setModalLogin
}: {
  setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={styles.container_aviso}
      onClick={() => {
        setModalLogin(false);
      }}
    >
      <Link className={styles.desktop} href={'/registrar'}>
        <Image
          alt="Imagem ilustrativa"
          width={1200}
          height={722}
          src={'/modal/addCartNoAccount.png'}
        />
      </Link>
      <Link className={styles.mobile} href={'/registrar'}>
        <Image
          alt="Imagem ilustrativa"
          width={667}
          height={722}
          src={'/modal/addCartNoAccount-mobile.png'}
        />
      </Link>
      <BtnFechar setAtivo={setModalLogin} />
    </div>
  );
};

export default CreateAccount;
