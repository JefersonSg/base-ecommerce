'use client';

import TituloSection from './TituloSection';
import styles from './Caracteristicas.module.css';
import { Texto } from '../../textos/Texto';
import React from 'react';

function Caracteristicas() {
  const [ativo, setAtivo] = React.useState(true);

  return (
    <div className={styles.caracteristicas}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Caracteristicas" />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <Texto
            texto="Textura Leve e Absorção Rápida: Sua textura 
            luxuosa e não oleosa é facilmente absorvida, 
            permitindo que o creme seja incorporado perfeitamente à sua 
            rotina diária de cuidados com a pele."
          />
        </div>
      )}
    </div>
  );
}

export default Caracteristicas;
