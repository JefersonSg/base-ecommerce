import React from 'react';
import styles from './ButtonDelete.module.css';

const ButtonDelete = ({ text }: { text: string }) => {
  return <button className={styles.btn_rmv}>{text}</button>;
};

export default ButtonDelete;
