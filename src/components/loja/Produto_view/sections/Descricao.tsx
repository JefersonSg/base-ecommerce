'use client';

import TituloSection from './TituloSection';
import styles from './Descricao.module.css';
import React from 'react';

function Descricao({ description }: { description: string }) {
  const [ativo, setAtivo] = React.useState(true);

  return (
    <div className={styles.descricao}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Descrição" ativo={ativo} />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <p className={'texto'}>{description}</p>
        </div>
      )}
    </div>
  );
}

export default Descricao;
