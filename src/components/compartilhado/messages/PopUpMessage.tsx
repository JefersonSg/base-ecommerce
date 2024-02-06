import React from 'react';
import styles from './PopUpMessage.module.css';

const PopUpMessage = ({ text, type }: { text: string; type?: string }) => {
  return (
    <span
      className={`${styles.popUp} ${
        type === 'error' ? styles.error : styles.confirmation
      }`}
    >
      {text}
    </span>
  );
};

export default PopUpMessage;
