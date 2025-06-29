'use client';

import React from 'react';
import styles from './PopUpMessage.module.css';
import Image from 'next/image';

const PopUpMessage = ({
  text,
  typePopUp,
  img,
  setMessagePopUp,
  setTypePopUp
}: {
  text: string;
  typePopUp: string;
  img?: string;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setMessagePopUp('');
      setTypePopUp('');
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [setMessagePopUp, setTypePopUp, text]);

  return (
    <span
      className={`${styles.popUp} ${
        typePopUp === 'error' ? styles.error : styles.confirmation
      }`}
    >
      <Image
        alt="imagem simbolizando confirmação da ação"
        width={44}
        height={44}
        unoptimized
        src={
          typePopUp === 'error'
            ? '/error_popup.svg'
            : img?.length
              ? img
              : '/confirm_popup.svg'
        }
      />

      {text}

      <div className={styles.timer_div}>
        <span
          className={`${styles.timer_span} ${
            typePopUp === 'error' ? styles.error_span : ''
          }`}
        ></span>
      </div>
    </span>
  );
};

export default PopUpMessage;
