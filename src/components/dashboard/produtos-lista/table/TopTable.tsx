import React from 'react';
import styles from './Toptable.module.css';
import ButtonAdd from '../../Botoes/ButtonAdd';
import Link from 'next/link';

const TopTable = ({
  setAtivo,
  setPesquisa,
  pesquisa
}: {
  pesquisa: string;
  setPesquisa: React.Dispatch<React.SetStateAction<string>>;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.top_table}>
      <input
        className={styles.input_searsh}
        type="text"
        placeholder="Procurar produto"
        alt="Input para pesquisar produtos"
        value={pesquisa}
        onChange={(e) => {
          setPesquisa(e.target.value);
        }}
      />
      <div className={styles.itens}>
        <Link href={'/dashboard/produtos/create'}>
          <ButtonAdd text="+Add Produto" setAtivo={setAtivo} />
        </Link>
      </div>
    </div>
  );
};

export default TopTable;
