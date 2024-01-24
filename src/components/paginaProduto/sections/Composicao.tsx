'use client';

import TituloSection from './TituloSection';
import styles from './Composicao.module.css';
import React from 'react';

function Composicao() {
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
          <p className="texto">
            Hidratação Intensa: A fórmula rica em ácido hialurônico de alta
            qualidade penetra nas camadas da pele, proporcionando uma hidratação
            profunda e duradoura, mantendo-a suave e radiante.
          </p>
        </div>
      )}
    </div>
  );
}

export default Composicao;
