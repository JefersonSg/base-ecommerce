import React from 'react';

const SelectAmount = ({
  color,
  index,
  amount,
  setAmount
}: {
  color: string;
  index: number;
  amount: number[];
  setAmount: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  return (
    <div>
      <label htmlFor={color}>Estoque de {color}</label>
      <input
        name={color}
        id={color}
        placeholder="insira a quantidade"
        type="number"
        min={0}
        value={amount?.[index] ?? ''}
        onChange={(e) => {
          const valueAll = [...amount];
          valueAll[index] = +e.target.value;

          setAmount(valueAll);
        }}
      />
    </div>
  );
};

export default SelectAmount;
