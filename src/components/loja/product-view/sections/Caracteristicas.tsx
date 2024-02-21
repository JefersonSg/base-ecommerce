'use client';

import TituloSection from './TituloSection';
import styles from './Caracteristicas.module.css';
import React from 'react';

function Caracteristicas({ characteristic }: { characteristic: string }) {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div className={styles.caracteristicas}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Caracteristicas" ativo={ativo} />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <p className={'texto'}>{characteristic}</p>
        </div>
      )}
    </div>
  );
}

export default Caracteristicas;
