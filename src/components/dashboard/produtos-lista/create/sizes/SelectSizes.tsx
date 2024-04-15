import React from 'react';
import styles from './SelectColor.module.css';
import ButtonDelete from '../../../Botoes/ButtonDelete';

const SelectSizes = ({
  sizes,
  setSizes
}: {
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div className={`div_container ${styles.variaveis_sizes}`}>
      <p className={styles.subtitulo}>Digite os tamanhos do produto</p>
      {sizes?.map((color, index) => {
        return (
          <div key={index} className={styles.sizes_amount_div}>
            <div>
              <label htmlFor={`color${index + 1}`}>{`Tamanho ${
                sizes[index] ?? index + 1
              }`}</label>
              <input
                type="text"
                id={`size${index + 1}`}
                placeholder={'ex: 300ml | 25g | M | G'}
                value={color}
                onChange={(e) => {
                  const valueAll = [...sizes];
                  valueAll[index] = e.target.value;

                  setSizes(valueAll);
                }}
              />
            </div>
          </div>
        );
      })}
      <div className={styles.botoes}>
        <div
          onClick={(e) => {
            e.preventDefault();
            const schema = [...sizes];
            schema.push(`${''}`);
            setSizes(schema);
          }}
        >
          <button className={styles.btn_add}>adicionar tamanho</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            if (sizes.length < 2) {
              return;
            }
            const schema = [...sizes];

            schema.pop();
            setSizes(schema);
          }}
        >
          <ButtonDelete text="Remover" />
        </div>
      </div>
    </div>
  );
};

export default SelectSizes;
