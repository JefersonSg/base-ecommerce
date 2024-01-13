'use client';

import TituloSection from './TituloSection';
import styles from './Composicao.module.css';
import { Texto } from '../../textos/Texto';
import React from 'react';

function Composicao() {
  const [ativo, setAtivo] = React.useState(true);

  return (
    <div className={styles.composicao}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Composicao" />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <Texto
            texto="Hidratação Intensa: A fórmula rica em ácido 
          hialurônico de alta qualidade penetra nas camadas da pele, 
          proporcionando uma hidratação profunda e duradoura, mantendo-a suave e 
          radiante."
          />
        </div>
      )}
    </div>
  );
}

export default Composicao;
