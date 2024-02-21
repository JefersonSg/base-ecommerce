'use client';

import TituloSection from './TituloSection';
import styles from './Composicao.module.css';
import React from 'react';

function Composicao({ composition }: { composition: string }) {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div className={styles.composicao}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Composicao" ativo={ativo} />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <p className="texto">{composition}</p>
        </div>
      )}
    </div>
  );
}

export default Composicao;
