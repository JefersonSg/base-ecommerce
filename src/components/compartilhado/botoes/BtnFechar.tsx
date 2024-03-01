import React from 'react';
import styles from './BtnFechar.module.css';

const BtnFechar = ({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <span
      className={styles.fechar}
      onClick={() => {
        setAtivo(false);
      }}
    >
      X
    </span>
  );
};

export default BtnFechar;
