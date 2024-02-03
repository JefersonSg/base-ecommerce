import React, { type FormEvent } from 'react';
import styles from './Toptable.module.css';
import ButtonAdd from '../../Botoes/ButtonAdd';

const TopTable = ({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [qntSelected, setQntSelected] = React.useState(7);

  function handleEdit(event: FormEvent<HTMLFormElement> | any) {
    setQntSelected(event?.target?.value);
  }
  return (
    <div className={styles.top_table}>
      <input
        className={styles.input_searsh}
        type="text"
        placeholder="Procurar categoria"
        alt="Input para pesquisar categorias"
      />
      <div className={styles.itens}>
        <select
          name="qnty"
          id="quantidade_views"
          className={styles.quantidade_views}
          value={qntSelected}
          onChange={handleEdit}
        >
          <option value="7">7</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <div
          onClick={() => {
            setAtivo(true);
          }}
        >
          <ButtonAdd text="+ Adicionar Categoria" setAtivo={setAtivo} />
        </div>
      </div>
    </div>
  );
};

export default TopTable;
