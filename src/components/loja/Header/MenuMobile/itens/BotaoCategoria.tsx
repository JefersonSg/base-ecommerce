'use client';

import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import styles from './BotaoCategoria.module.css';
import Image from 'next/image';
import Subcategorias from './Subcategorias';
import React from 'react';

function BotaoCategoria({
  category,
  setAtivo,
  setAtivoLista,
  ativoLista
}: {
  category: CategoryInterface;
  ativoLista: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoLista: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <li className={styles.lista}>
      <div
        className={styles.div_name}
        onClick={() => {
          if (ativoLista === category.name) {
            setAtivoLista('');
          } else {
            setAtivoLista(category.name);
          }
        }}
      >
        <p>{category?.name}</p>
        <div
          className={`${styles.seta} ${
            ativoLista === category.name ? styles.ativo : ''
          }`}
        >
          <Image alt="seta" src={'/setaBaixoW1.svg'} width={10} height={10} />
        </div>
      </div>
      {ativoLista === category.name && (
        <Subcategorias category={category} setAtivo={setAtivo} />
      )}
    </li>
  );
}

export default BotaoCategoria;
