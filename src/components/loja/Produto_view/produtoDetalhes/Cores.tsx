'use client';

import React from 'react';
import styles from './Cores.module.css';
import Image from 'next/image';

function Cores({
  colors,
  codeColors
}: {
  colors: string[];
  codeColors: string[];
}) {
  const [ativo, setAtivo] = React.useState(false);
  const [colorSelected, setColorSelected] = React.useState(codeColors[0]);
  return (
    <div className={styles.selectColor_container}>
      <div
        className={styles.cores}
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <p className="texto">Cor</p>
        <div className={styles.select_color}>
          <div
            className={styles.cor_selecionada}
            style={{ background: colorSelected }}
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
      {ativo && (
        <div className={styles.selectColors}>
          {colors.map((color, index) => {
            return (
              <div
                key={index}
                className={styles.cores_disponiveis}
                onClick={() => {
                  setColorSelected(codeColors[index]);
                  setAtivo(false);
                }}
              >
                {color}
                <div
                  className={styles.cor_selecionada}
                  style={{ background: codeColors[index] }}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cores;
