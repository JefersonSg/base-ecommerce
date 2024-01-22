import React, { type ChangeEvent } from 'react';
import styles from './Pesquisa.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Pesquisa = () => {
  const [ativo, setAtivo] = React.useState(false);
  const [pesquisa, setPesquisa] = React.useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPesquisa(event.target?.value);
  }

  return (
    <>
      <Image
        onClick={() => {
          setAtivo(!ativo);
        }}
        alt="Lupa"
        className={styles.lupa}
        src={'header/icons/lupa.svg'}
        width={24}
        height={24}
      />
      {ativo && (
        <>
          <div className={styles.pesquisa}>
            <input
              className={styles.input_pesquisa}
              type="text"
              placeholder="Creme hidratante"
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
              IR
            </Link>
          </div>
          <div
            className={styles.fundo}
            onClick={() => {
              setAtivo(!ativo);
            }}
          ></div>
        </>
      )}
    </>
  );
};

export default Pesquisa;
