'use client';

import {
  type subcategoryInterface,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import styles from './BotaoCategoria.module.css';
import Image from 'next/image';
import Subcategorias from './Subcategorias';
import React from 'react';

function BotaoCategoria({
  category,
  setAtivo,
  setAtivoLista,
  ativoLista,
  subcategories
}: {
  category: CategoryInterface;
  subcategories: { subcategories: subcategoryInterface[] };
  ativoLista: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoLista: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <li className={styles.lista}>
      <div
        className={styles.div_name}
        onClick={() => {
          if (ativoLista === category._id) {
            setAtivoLista('');
          } else {
            setAtivoLista(category._id);
          }
        }}
      >
        <p>{category?.name}</p>
        <div
          className={`${styles.seta} ${
            ativoLista === category._id ? styles.ativo : ''
          }`}
        >
          <Image alt="seta" src={'/setaBaixoW1.svg'} width={10} height={10} />
        </div>
      </div>
      {ativoLista === category._id && (
        <Subcategorias
          category={category}
          subcategories={subcategories}
          setAtivo={setAtivo}
        />
      )}
    </li>
  );
}

export default BotaoCategoria;
