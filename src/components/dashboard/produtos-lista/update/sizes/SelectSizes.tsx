import React from 'react';
import styles from './SelectSize.module.css';
import ButtonDelete from '../../../Botoes/ButtonDelete';

const SelectSizes = ({
  sizes,
  setSizes,
  setAmount,
  amount
}: {
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
  amount: number[][];
  setAmount: React.Dispatch<React.SetStateAction<number[][]>>;
}) => {
  return (
    <div className={`div_container ${styles.variaveis_sizes}`}>
      <p className={styles.subtitulo}>Digite os tamanhos do produto</p>
      {sizes?.map((size, index) => {
        return (
          <div key={index} className={styles.sizes_amount_div}>
            <div>
              <label htmlFor={`size${index + 1}`}>{`Tamanho ${
                index + 1
              }`}</label>
              <input
                type="text"
                id={`size${index + 1}`}
                placeholder={'ex: 300ml | 25g | M | G'}
                value={size}
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

            console.log(amount);
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
            const newAmount = [...amount];

            newAmount.forEach((item: any) => {
              const indexRemove = sizes.length - 1;
              item.splice(indexRemove);
            });

            setAmount(newAmount);

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
