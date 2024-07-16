import React from 'react';
import styles from './selectAmount.module.css';

const SelectAmount = ({
  color,
  indexColor,
  amount,
  setAmount,
  corAtiva,
  sizes
}: {
  color: string;
  indexColor: number;
  amount: number[][];
  setAmount: React.Dispatch<React.SetStateAction<number[][]>>;
  corAtiva: boolean;
  sizes: string[];
}) => {
  return (
    <div className={styles.amount_container}>
      <p className={styles.texto_titulo}>
        {corAtiva ? `Estoque da cor ${color}` : 'Estoque do produto'}
      </p>
      {sizes?.map((size, index) => {
        return (
          <div key={index} className={styles.input_amount}>
            <label htmlFor={`${size + color}`}>{size}</label>
            <input
              className={`${!size ? styles.error : ''}`}
              name={`${size + color}`}
              id={`${size + color}`}
              placeholder="insira a quantidade"
              type="number"
              min={0}
              value={amount?.[indexColor]?.[index] ?? ''}
              onChange={(e) => {
                const valueAll = [...amount];

                valueAll[indexColor][index] = +e.target.value;

                setAmount(valueAll);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SelectAmount;
