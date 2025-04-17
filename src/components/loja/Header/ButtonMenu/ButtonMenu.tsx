import React from 'react';
import styles from './ButtonMenu.module.css';

export function ButtonMenu({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <button
        className={styles.mobile_button}
        onClick={() => {
          setAtivo(true);
        }}
        aria-label="abrir menu mobile"
      >
        Menu Mobile
      </button>
    </>
  );
}
