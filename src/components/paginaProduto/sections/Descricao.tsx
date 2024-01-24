'use client';

import TituloSection from './TituloSection';
import styles from './Descricao.module.css';
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
        <TituloSection texto="Descrição" ativo={ativo} />
      </div>
      {ativo && (
        <div className={styles.texto}>
          <p className={'texto'}>
            Creme hydra, creme facial hidratante com acido hialurônico perfetio
            para quem está buscando praticidade no seu dia a dia para cuidados
            com a sua pele e rosto.
          </p>
        </div>
      )}
    </div>
  );
}

export default Descricao;
