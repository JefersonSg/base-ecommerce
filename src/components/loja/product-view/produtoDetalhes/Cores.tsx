'use client';

import React from 'react';
import styles from './Cores.module.css';

function Cores({
  colors,
  codeColors,
  colorSelected,
  setColorSelected,
  sizeSelected,
  setSizeSelected,
  sizes,
  amount,
  setMessagePopUp,
  setTypePopUp
}: {
  colorSelected?: string;
  colors?: string[] | undefined;
  codeColors?: string[] | undefined;
  setColorSelected: React.Dispatch<React.SetStateAction<string>>;
  sizeSelected: string;
  setSizeSelected: React.Dispatch<React.SetStateAction<string>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  sizes: string[];
  amount: number[][];
}) {
  const [ativo, setAtivo] = React.useState(false);

  const [codeColorSelected, setCodeColorSelected] = React.useState(
    codeColors ? (codeColors[0] ?? '') : ''
  );

  return (
    <>
      {colors?.[0] && colors?.[0]?.length > 0 ? (
        <div className={styles.selectColor_container}>
          <p className={styles.cor_selecionada_span}>
            Cor: <span>{colorSelected}</span>
          </p>
          <div
            className={`${styles.selectColors} ${ativo ? styles.ativo : ''}`}
          >
            {colors?.map((color, index) => {
              return (
                <div
                  key={index}
                  className={styles.cores_disponiveis}
                  onClick={() => {
                    setColorSelected(colors[index]);
                    setCodeColorSelected(codeColors?.[index] ?? '');
                    setAtivo(false);

                    if (amount[index][sizes.indexOf(sizeSelected)] === 0) {
                      setSizeSelected('');
                      setTypePopUp('error');
                      setMessagePopUp('Sem estoque disponível neste tamanho');
                    }
                  }}
                >
                  {color}
                  <div
                    className={`${styles.contentOption} ${
                      codeColorSelected === codeColors?.[index]
                        ? styles.ativo
                        : ''
                    }`}
                  >
                    <div
                      className={styles.contentColor}
                      style={{
                        background: codeColors?.[index]
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Cores;
