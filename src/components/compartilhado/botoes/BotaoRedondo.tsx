import React from 'react';
import styles from './BotaoRedondo.module.css';
import Image from 'next/image';

const BotaoRedondo = ({
  texto,
  img,
  disabled,
  style2,
  textDisabled
}: {
  texto: string;
  img?: string;
  disabled?: boolean;
  style2?: boolean;
  textDisabled?: string;
}) => {
  return (
    <button
      className={`${styles.botao_redondo} ${style2 ? styles.style2 : ''} ${
        disabled ? styles.disabled : ''
      }`}
      disabled={disabled}
    >
      {img && (
        <Image
          alt="Imagem Ilustrativa para o botão"
          src={img}
          width={24}
          height={24}
          unoptimized
        />
      )}
      <p>{`${
        !disabled ? texto : disabled && textDisabled ? textDisabled : texto
      }`}</p>
    </button>
  );
};

export default BotaoRedondo;
