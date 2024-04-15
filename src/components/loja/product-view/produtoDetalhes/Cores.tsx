'use client';

import React from 'react';
import styles from './Cores.module.css';
import Image from 'next/image';

function Cores({
  colors,
  codeColors,
  colorSelected,
  setColorSelected
}: {
  colorSelected?: string;
  colors?: string[] | undefined;
  codeColors?: string[] | undefined;
  setColorSelected: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [ativo, setAtivo] = React.useState(false);

  const [codeColorSelected, setCodeColorSelected] = React.useState(
    codeColors ? codeColors[0] ?? '' : ''
  );
  return (
    <div className={styles.selectColor_container}>
      <div
        className={styles.cores}
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <p className="texto">{colorSelected}</p>
        <div className={styles.select_color}>
          <div
            className={styles.cor_selecionada}
            style={{ background: codeColorSelected }}
          ></div>
          <Image
            className={`${ativo ? styles.ativo : ''} ${styles.seta}`}
            alt="Seta"
            src={'/setaBaixo.svg'}
            width={9}
            height={9}
          />
        </div>
      </div>
      <p className={styles.cor_selecionada_span}>
        Cor: <span>{colorSelected}</span>
      </p>
      <div className={`${styles.selectColors} ${ativo ? styles.ativo : ''}`}>
        {colors?.map((color, index) => {
          return (
            <div
              key={index}
              className={styles.cores_disponiveis}
              onClick={() => {
                setColorSelected(colors[index]);
                setCodeColorSelected(codeColors?.[index] ?? '');
                setAtivo(false);
              }}
            >
              {color}
              <div
                className={`${styles.cor_selecionada} ${
                  codeColorSelected === codeColors?.[index] ? styles.ativo : ''
                }`}
                style={{
                  background: codeColors?.[index],
                  border: `${
                    codeColorSelected === codeColors?.[index]
                      ? '1.5px solid' + codeColors[index]
                      : ''
                  }`
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cores;
