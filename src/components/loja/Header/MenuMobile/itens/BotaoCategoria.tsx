'use client';

import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import styles from './BotaoCategoria.module.css';
import Image from 'next/image';
import Subcategorias from './Subcategorias';
import React from 'react';

function BotaoCategoria({
  category,
  setAtivo
}: {
  category: CategoryInterface;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [ativoLista, setAtivoLista] = React.useState(false);

  return (
    <li className={styles.lista}>
      <div
        className={styles.div_name}
        onClick={() => {
          setAtivoLista(!ativoLista);
        }}
      >
        <p>{category?.name}</p>
        <div className={styles.seta}>
          <Image alt="seta" src={'/setaBaixo.svg'} width={10} height={10} />
        </div>
      </div>
      {ativoLista && <Subcategorias category={category} setAtivo={setAtivo} />}
    </li>
  );
}

export default BotaoCategoria;
