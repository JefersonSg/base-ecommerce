import React from 'react';
import styles from './ButtonAdd.module.css';

const ButtonAdd = ({
  text,
  setAtivo
}: {
  text: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return <button className={styles.btn_add}>{text}</button>;
};

export default ButtonAdd;
