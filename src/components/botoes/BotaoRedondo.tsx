import React from 'react';
import styles from './BotaoRedondo.module.css';
import Image from 'next/image';

const BotaoRedondo = ({
  texto,
  img,
  disabled,
}: {
  texto: string;
  img?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${styles.botao_redondo} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      {img && (
        <Image
          alt="Imagem Ilustrativa para o botão"
          src={img}
          width={24}
          height={24}
        />
      )}
      <p>{texto}</p>
    </button>
  );
};

export default BotaoRedondo;
