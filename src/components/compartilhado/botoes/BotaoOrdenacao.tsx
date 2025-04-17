import React from 'react';
import styles from './BotaoOrdenacao.module.css';

const BotaoOrdenacao = () => {
  return (
    <div className={styles.botao_ordenacao}>
      <span className={styles.linha1}></span>
      <span className={styles.linha2}></span>
      <span className={styles.linha3}></span>
    </div>
  );
};

export default BotaoOrdenacao;
