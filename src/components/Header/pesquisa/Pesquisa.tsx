import React from 'react';
import styles from './Pesquisa.module.css';
import Image from 'next/image';

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
            <span className={styles.button_pesquisa}>IR</span>
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
