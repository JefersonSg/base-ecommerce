'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Titulo.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Titulo({ titulo }: { titulo: string }) {
  const router = useRouter();

  return (
    <div className={styles.div_titulo}>
      <Link
        href={'/'}
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        {' '}
        <Image
          alt="Seta de voltar"
          src={'/setaVoltar.svg'}
          width={16}
          height={12}
        />
      </Link>
      <h1 className={'titulo_sessao'}>{titulo}</h1>
    </div>
  );
}
