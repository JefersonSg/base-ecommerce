import React from 'react';
import styles from './ButtonMenu.module.css';

export function ButtonMenu({
  ativo,
  setAtivo
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <button
        className={`${styles.mobile_button} ${ativo ? styles.ativo : ''}`}
        onClick={() => {
          setAtivo(!ativo);
        }}
      ></button>
    </>
  );
}
