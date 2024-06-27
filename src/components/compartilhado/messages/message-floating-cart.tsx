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
  function closeMessage() {
    setMessagePopUp('');
    setTypePopUp('');
  }

  return (
    <div
      className={`${styles.popUp} ${
        typePopUp === 'error' ? styles.error : styles.confirmation
      }`}
    >
      <Image
        alt="imagem simbolizando confirmação da ação"
        width={44}
        height={44}
        src={
          typePopUp === 'error'
            ? '/error_popup.svg'
            : img?.length
              ? img
              : '/confirm_popup.svg'
        }
      />

      {text}
      <span className={styles.fechar} onClick={closeMessage}>
        X
      </span>
    </div>
  );
};

export default PopUpMessage;
