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
  setAmount,
  corAtiva,
  setCorAtiva
}: {
  schemeColor: string[];
  schemeCodeColor: string[];
  amount: number[];
  setSchemeColor: React.Dispatch<React.SetStateAction<string[]>>;
  setAmount: React.Dispatch<React.SetStateAction<number[]>>;
  setSchemeCodeColor: React.Dispatch<React.SetStateAction<string[]>>;
  corAtiva: boolean;
  setCorAtiva: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={`div_container ${styles.variaveis_colors}`}>
      <p className={styles.subtitulo}>cores E quantidade do estoque</p>
      <div className={styles.checkbox_color}>
        <label htmlFor="corAtiva">Item sem cor?</label>
        <input
          name="corAtiva"
          type="checkbox"
          checked={!corAtiva}
          onChange={(e) => {
            setCorAtiva(!corAtiva);
          }}
        />
      </div>
      {schemeColor?.map((color, i) => {
        return (
          <div key={i} className={styles.colors_amount_div}>
            {corAtiva && (
              <>
                <div>
                  <label htmlFor={`color${i + 1}`}>{`Cor ${i + 1}`}</label>
                  <input
                    type="text"
                    id={`color${i + 1}`}
                    placeholder="Digite o nome da cor"
                    value={color}
                    onChange={(e) => {
                      const valueAll = [...schemeColor];
                      valueAll[i] = e.target.value;

                      setSchemeColor(valueAll);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor={`codeColor${i + 1}`}>
                    Selecione o tom da cor
                  </label>
                  <input
                    type="color"
                    id={`codeColor${i + 1}`}
                    value={schemeCodeColor[i] ?? '#000000'}
                    onChange={(e) => {
                      e.preventDefault();
                      const schemeCode = [...schemeCodeColor];
                      schemeCode[i] = e.currentTarget.value;
                      setSchemeCodeColor(schemeCode);
                    }}
                  />
                </div>
              </>
            )}
            <SelectAmount
              corAtiva={corAtiva}
              color={color}
              index={i}
              setAmount={setAmount}
              amount={amount}
            />
          </div>
        );
      })}
      {corAtiva && (
        <div className={styles.botoes}>
          <div
            onClick={(e) => {
              e.preventDefault();
              const schema = [...schemeColor];
              const codeColor = [...schemeCodeColor];
              schema?.push(`${''}`);
              codeColor[schemeColor.length] = '#FFFFFF';

              setSchemeColor(schema);
              setSchemeCodeColor(codeColor);
            }}
          >
            <button className={styles.btn_add}>adicionar outra cor</button>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              if (schemeColor.length < 1) {
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
      )}
    </div>
  );
};

export default SelectColor;
