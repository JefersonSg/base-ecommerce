import React from 'react';
import styles from './SelectColor.module.css';
import ButtonDelete from '../../../Botoes/ButtonDelete';
import SelectAmount from '../amount/SelectAmount';

const SelectColor = ({
  schemeColor,
  schemeCodeColor,
  amount,
  setSchemeColor,
  setSchemeCodeColor,
  setAmount
}: {
  schemeColor: string[];
  schemeCodeColor: string[];
  amount: number[];
  setSchemeColor: React.Dispatch<React.SetStateAction<string[]>>;
  setAmount: React.Dispatch<React.SetStateAction<number[]>>;

  setSchemeCodeColor: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div className={`div_container ${styles.variaveis_colors}`}>
      <p className={styles.subtitulo}>Escolha a variação de cores</p>

      {schemeColor?.map((color, index) => {
        return (
          <div key={index} className={styles.colors_amount_div}>
            <div>
              <label htmlFor={`color${index + 1}`}>{`Cor ${index + 1}`}</label>
              <input
                type="text"
                id={`color${index + 1}`}
                placeholder="Digite o nome da cor"
                value={color}
                onChange={(e) => {
                  const valueAll = [...schemeColor];
                  valueAll[index] = e.target.value;

                  setSchemeColor(valueAll);
                }}
              />
            </div>
            <div>
              <label htmlFor={`codeColor${index + 1}`}>
                Selecione o tom da cor
              </label>
              <input
                type="color"
                id={`codeColor${index + 1}`}
                value={schemeCodeColor[index] ?? '#000000'}
                onChange={(e) => {
                  e.preventDefault();
                  const schemeCode = [...schemeCodeColor];
                  schemeCode[index] = e.currentTarget.value;
                  setSchemeCodeColor(schemeCode);
                }}
              />
            </div>
            <SelectAmount
              color={color}
              index={index}
              setAmount={setAmount}
              amount={amount}
            />
          </div>
        );
      })}
      <div className={styles.botoes}>
        <div
          onClick={(e) => {
            e.preventDefault();
            const schema = [...schemeColor];
            const codeColor = [...schemeCodeColor];
            schema.push(`${''}`);
            codeColor[schemeColor.length] = '#000000';
            setSchemeColor(schema);
            setSchemeCodeColor(codeColor);
          }}
        >
          <button className={styles.btn_add}>adicionar outra cor</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            if (schemeColor.length < 2) {
              return;
            }
            const schema = [...schemeColor];
            const codeColor = [...schemeCodeColor];

            codeColor.pop();
            schema.pop();
            setSchemeColor(schema);
            setSchemeCodeColor(codeColor);
          }}
        >
          <ButtonDelete text="Remover" />
        </div>
      </div>
    </div>
  );
};

export default SelectColor;
