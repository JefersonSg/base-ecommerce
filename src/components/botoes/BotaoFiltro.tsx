import React from 'react';
import styles from './BotaoFiltro.module.css';

const BotaoFiltro = ({
  ativo,
  setAtivo
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => {
        setAtivo(!ativo);
      }}
      className={`${styles.menu_filtro} ${ativo ? styles.ativo : ''}`}
    >
      <span className={styles.linha1}></span>
      <span className={styles.linha2}></span>
      <span className={styles.linha3}></span>
    </div>
  );
};

export default BotaoFiltro;
