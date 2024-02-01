import React from 'react';
import styles from './ButtonAdd.module.css';

const ButtonAdd = ({ text }: { text: string }) => {
  return <button className={styles.btn_add}>{text}</button>;
};

export default ButtonAdd;
