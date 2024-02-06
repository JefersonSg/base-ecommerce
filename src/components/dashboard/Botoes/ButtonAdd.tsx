import React from 'react';
import styles from './ButtonAdd.module.css';

const ButtonAdd = ({
  text,
  isLoading,
  setAtivo
}: {
  text: string;
  isLoading?: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={`${styles.btn_add} ${isLoading ? styles.loading : ''}`}
      disabled={isLoading}
    >
      {text}
    </button>
  );
};

export default ButtonAdd;
