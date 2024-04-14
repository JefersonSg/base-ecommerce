'use client';

import TituloSection from './TituloSection';
import styles from './ModoDeUso.module.css';
import React from 'react';

function ModoDeUso({ howToUse }: { howToUse: string }) {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div className={styles.modo_de_uso}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Modo de uso" ativo={ativo} />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <p className={'texto'}>{howToUse}</p>
        </div>
      )}
    </div>
  );
}

export default ModoDeUso;
