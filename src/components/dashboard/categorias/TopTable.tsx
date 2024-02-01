import React from 'react';
import styles from './Toptable.module.css';
import ButtonAdd from '../Botoes/ButtonAdd';

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
        placeholder="Procurar categoria"
        alt="Input para pesquisar categorias"
      />
      <div className={styles.itens}>
        <span className={styles.select_qnt}>7</span>
        <div
          onClick={() => {
            setAtivo(true);
          }}
        >
          <ButtonAdd text="+ Adicionar Categoria" />
        </div>
      </div>
    </div>
  );
};

export default TopTable;
