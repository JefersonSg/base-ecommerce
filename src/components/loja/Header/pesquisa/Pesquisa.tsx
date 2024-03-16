'use client';

import React, { type ChangeEvent } from 'react';
import styles from './Pesquisa.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ResultadoPesquisa from './ResultadoPesquisa';

const Pesquisa = () => {
  const [ativo, setAtivo] = React.useState(false);
  const [pesquisa, setPesquisa] = React.useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPesquisa(event.target?.value);
    setAtivo(true);
  }

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

      <>
        <div className={`${styles.pesquisa} ${ativo ? styles.ativo : ''}`}>
          {ativo && pesquisa && (
            <ResultadoPesquisa
              pesquisa={pesquisa}
              setAtivo={setAtivo}
              setPesquisa={setPesquisa}
            />
          )}

          <Image
            alt="seta de voltar"
            className={styles.seta_voltar}
            src={'/setaVoltar.svg'}
            width={20}
            height={20}
            onClick={() => {
              setAtivo(false);
            }}
          />
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
        {pesquisa || ativo ? (
          <div
            className={styles.fundo}
            onClick={() => {
              setAtivo(false);
            }}
          ></div>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default Pesquisa;
