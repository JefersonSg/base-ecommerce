import React from 'react';

const SelectAmount = ({
  color,
  index,
  amount,
  setAmount,
  corAtiva
}: {
  color: string;
  index: number;
  amount: number[];
  setAmount: React.Dispatch<React.SetStateAction<number[]>>;
  corAtiva: boolean;
}) => {
  return (
    <div>
      <label htmlFor={color}>
        {corAtiva ? `Estoque da cor ${color}` : 'Estoque do produto'}
      </label>
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
