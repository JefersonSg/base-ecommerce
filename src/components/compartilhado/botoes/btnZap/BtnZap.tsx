'use client';

import Image from 'next/image';
import React from 'react';
import styles from './BtnZap.module.css';
import Link from 'next/link';

export function BtnZap() {
  return (
    <>
      <Link
        href={`https://wa.me/5532984920918?text=Olá, gostaria de tirar uma duvida`}
        target="_blank"
        className={styles.btnZap}
      >
        <Image
          alt="Imagem whatsapp"
          src={'/whatsapp.svg'}
          width={44}
          height={44}
          unoptimized
        />
      </Link>
    </>
  );
}
