'use client';

import React from 'react';
import styles from './ButtonsFilterContainer.module.css';
import BotaoFiltro from '@/src/components/compartilhado/botoes/BotaoFiltro';
import BotaoOrdenacao from '@/src/components/compartilhado/botoes/BotaoOrdenacao';

const ButtonsFilterContainer = ({
  ativo,
  setAtivo
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.buttons_filtros_container}>
      <div
        className={styles.button_filtro}
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <BotaoFiltro ativo={ativo} setAtivo={setAtivo} /> <p>Filtrar</p>
      </div>
      <div className={styles.button_order}>
        <BotaoOrdenacao />
        <p>A - Z</p>
      </div>
    </div>
  );
};

export default ButtonsFilterContainer;
