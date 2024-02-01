import React from 'react';
import styles from './ButtonDelete.module.css';

const ButtonDelete = ({
  text,
  setAtivo
}: {
  text: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={styles.btn_rmv}
      onClick={(e) => {
        e.preventDefault();
        setAtivo(false);
      }}
    >
      {text}
    </button>
  );
};

export default ButtonDelete;
