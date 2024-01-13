'use client';

import TituloSection from './TituloSection';
import styles from './Descricao.module.css';
import { Texto } from '../../textos/Texto';
import React from 'react';

function Descricao() {
  const [ativo, setAtivo] = React.useState(true);

  return (
    <div className={styles.descricao}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Descrição" />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <Texto
            texto="Creme hydra, creme facial hidratante com acido
         hialurônico perfetio para quem está buscando
          praticidade no seu dia a dia para cuidados 
          com a sua pele e rosto."
          />
        </div>
      )}
    </div>
  );
}

export default Descricao;
