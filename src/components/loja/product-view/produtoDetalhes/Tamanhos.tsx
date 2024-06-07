'use client';

import React from 'react';
import styles from './Tamanhos.module.css';
import Image from 'next/image';

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
  const [ativo, setAtivo] = React.useState(false);

  React.useEffect(() => {
    setIndexColorSelected(colors?.indexOf(colorSelected) ?? 0);
  }, [colorSelected, colors, indexColorSelected]);

  return (
    <div className={styles.tamanhos_container}>
      <span className={styles.span_tamanho}>Tamanhos:</span>
      <p
        className={styles.size_selected}
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        {sizeSelected}{' '}
        <Image
          className={`${ativo ? styles.ativo : ''} ${styles.seta}`}
          alt="Seta"
          src={'/setaBaixo.svg'}
          width={9}
          height={9}
        />
      </p>
      <div
        className={`${styles.tamanhos_valor}  ${styles.selectSizes} ${
          ativo ? styles.ativo : ''
        }`}
      >
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
                setAtivo(false);
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
