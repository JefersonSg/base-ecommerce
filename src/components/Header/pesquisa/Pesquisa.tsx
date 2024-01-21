import React from 'react';
import styles from './Pesquisa.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Pesquisa = () => {
  const [ativo, setAtivo] = React.useState(false);

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
            />
            <Link
              onClick={() => {
                setAtivo(!ativo);
              }}
              href={'/produtos'}
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
