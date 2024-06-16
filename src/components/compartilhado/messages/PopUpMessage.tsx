import React from 'react';
import styles from './PopUpMessage.module.css';
import Image from 'next/image';

const PopUpMessage = ({
  text,
  type,
  img,
  setTextPopUp
}: {
  text: string;
  type?: string;
  img?: string;
  setTextPopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setTextPopUp('');
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [setTextPopUp, text]);

  return (
    <span
      className={`${styles.popUp} ${
        type === 'error' ? styles.error : styles.confirmation
      }`}
    >
      <Image
        alt="imagem simbolizando confirmação da ação"
        width={44}
        height={44}
        src={
          img ?? (type === 'error' ? '/error_popup.svg' : '/confirm_popup.svg')
        }
      />

      {text}

      <div className={styles.timer_div}>
        <span
          className={`${styles.timer_span} ${
            type === 'error' ? styles.error_span : ''
          }`}
        ></span>
      </div>
    </span>
  );
};

export default PopUpMessage;
