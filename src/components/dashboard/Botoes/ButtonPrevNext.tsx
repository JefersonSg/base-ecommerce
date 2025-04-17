import React from 'react';
import styles from './ButtonPrevNext.module.css';

const ButtonPrevNext = ({ text }: { text: string }) => {
  return <button className={styles.button_prev_next}>{text}</button>;
};

export default ButtonPrevNext;
