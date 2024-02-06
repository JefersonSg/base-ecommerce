import React from 'react';
import styles from './ButtonDelete.module.css';

const ButtonDelete = ({
  text,
  setAtivo,
  isLoading
}: {
  text: string;
  isLoading: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={`${styles.btn_rmv} ${isLoading ? styles.loading : ''}`}
      onClick={(e) => {
        e.preventDefault();
        setAtivo(false);
      }}
      disabled={isLoading}
    >
      {text}
    </button>
  );
};

export default ButtonDelete;
