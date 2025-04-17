'use client';

import React from 'react';
import styles from './Toptable.module.css';
import ButtonAdd from '../../Botoes/ButtonAdd';

const TopTable = ({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.top_table}>
      <input
        className={styles.input_searsh}
        type="text"
        placeholder="Procurar subcategoria"
        alt="Input para pesquisar subcategorias"
      />
      <div className={styles.itens}>
        <div
          onClick={() => {
            setAtivo(true);
          }}
        >
          <ButtonAdd text="+Add Subcategoria" setAtivo={setAtivo} />
        </div>
      </div>
    </div>
  );
};

export default TopTable;
