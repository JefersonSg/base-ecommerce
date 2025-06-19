'use client';
import React from 'react';
import styles from './AdicionarCarrinho.module.css';

interface Botao {
  texto: string;
  img?: string;
  alt?: string;
  caps?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

const AdicionarCarrinho = ({
  texto,
  img,
  caps,
  alt,
  isLoading,
  disabled
}: Botao) => {
  return (
    <button
      className={`${styles.botaoColorido} ${isLoading ? styles.loading : ''} ${
        disabled ? styles.disabled : ''
      }`}
      disabled={disabled}
    >
      {caps ? texto.toUpperCase() : texto}
    </button>
  );
};

export default AdicionarCarrinho;
