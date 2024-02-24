'use client';

import React, { type ChangeEvent } from 'react';
import styles from './Pesquisa.module.css';
import Image from 'next/image';
import Link from 'next/link';
import useMedia from '@/src/shared/hooks/useMedia';
import ResultadoPesquisa from './ResultadoPesquisa';

const Pesquisa = () => {
  const [ativo, setAtivo] = React.useState(false);
  const [pesquisa, setPesquisa] = React.useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPesquisa(event.target?.value);
    setAtivo(true);
  }

  const mobile = useMedia('(max-width: 64rem)');

  return (
    <>
      <Image
        onClick={() => {
          setAtivo(!ativo);
        }}
        alt="Lupa"
        className={styles.lupa}
        src={'/header/icons/lupa.svg'}
        width={24}
        height={24}
      />
      {ativo || !mobile ? (
        <>
          <div className={styles.pesquisa}>
            {ativo && <ResultadoPesquisa pesquisa={pesquisa} />}

            <input
              className={styles.input_pesquisa}
              type="text"
              placeholder="O que você procura?"
              value={pesquisa}
              onChange={handleChange}
            />
            <Link
              onClick={() => {
                setAtivo(!ativo);
              }}
              href={`/produtos/${pesquisa}`}
              className={styles.button_pesquisa}
            >
              <Image
                alt="Lupa"
                className={styles.lupaInput}
                src={'/header/icons/lupa.svg'}
                width={24}
                height={24}
              />
            </Link>
          </div>
          {mobile || pesquisa ? (
            <div
              className={styles.fundo}
              onClick={() => {
                setAtivo(!ativo);
              }}
            ></div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Pesquisa;
