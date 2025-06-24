'use client';

import React from 'react';
import styles from './Tamanhos.module.css';

function Tamanhos({
  colorSelected,
  colors,
  amount,
  sizeSelected,
  sizes,
  setSizeSelected,
  setMessagePopUp,
  setTypePopUp
}: {
  colorSelected: string;
  colors: string[] | undefined;
  amount: number[][];
  sizeSelected: string;
  sizes: string[];
  setSizeSelected: React.Dispatch<React.SetStateAction<string>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [indexColorSelected, setIndexColorSelected] = React.useState(0);
  const [ativo, setAtivo] = React.useState(false);

  React.useEffect(() => {
    setIndexColorSelected(colors?.indexOf(colorSelected) ?? 0);
  }, [colorSelected, colors, indexColorSelected]);

  return (
    <div className={styles.tamanhos_container}>
      <span className={styles.span_tamanho}>Tamanho</span>

      <div
        className={`${styles.tamanhos_valor}  ${styles.selectSizes} ${
          ativo ? styles.ativo : ''
        }`}
      >
        {sizes.map((size, index) => {
          return (
            <div
              key={index + size}
              className={`${styles.tamanhos} ${
                size === sizeSelected ? styles.selected : ''
              } ${
                amount?.[indexColorSelected]?.[index] === 0
                  ? styles.noStock
                  : ''
              } `}
              onClick={() => {
                setSizeSelected(size);
                setAtivo(false);
                if (amount?.[indexColorSelected]?.[index] === 0) {
                  setTypePopUp('error');
                  setMessagePopUp(
                    `Sem estoque disponível no tamanho ${amount?.[indexColorSelected]?.[index]}`
                  );
                }
              }}
            >
              <p className="texto">{size}</p>
            </div>
          );
        })}
      </div>
      <span className={styles.indicação}>Escolha o tamanho</span>
    </div>
  );
}

export default Tamanhos;
