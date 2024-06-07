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
  setTextPopUp
}: {
  colorSelected: string;
  colors: string[] | undefined;
  amount: number[][];
  sizeSelected: string;
  sizes: string[];
  setSizeSelected: React.Dispatch<React.SetStateAction<string>>;
  setTextPopUp: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [indexColorSelected, setIndexColorSelected] = React.useState(0);
  React.useEffect(() => {
    setIndexColorSelected(colors?.indexOf(colorSelected) ?? 0);
  }, [colorSelected, colors, indexColorSelected]);

  return (
    <div className={styles.tamanhos_container}>
      <span className={styles.span_tamanho}>Tamanhos:</span>
      <div className={styles.tamanhos_valor}>
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className={`${styles.tamanhos} ${
                size === sizeSelected ? styles.selected : ''
              } ${
                amount?.[indexColorSelected]?.[index] === 0
                  ? styles.noStock
                  : ''
              } `}
              onClick={() => {
                setSizeSelected(size);
                if (amount?.[indexColorSelected]?.[index] === 0) {
                  setTextPopUp('Sem estoque disponível neste tamanho');
                }
              }}
            >
              <p className="texto">{size}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tamanhos;
