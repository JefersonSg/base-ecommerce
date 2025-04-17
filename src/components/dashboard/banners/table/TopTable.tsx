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
      <div
        onClick={() => {
          setAtivo(true);
        }}
      >
        <ButtonAdd text="Novo Banner" setAtivo={setAtivo} />
      </div>
    </div>
  );
};

export default TopTable;
