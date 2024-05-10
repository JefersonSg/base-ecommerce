'use client';

import TituloSection from './TituloSection';
import styles from './Descricao.module.css';
import React from 'react';

function Descricao({
  description,
  title
}: {
  description: string;
  title: string;
}) {
  const [ativo, setAtivo] = React.useState(title === 'Descrição');

  return (
    <div className={styles.descricao}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto={title} ativo={ativo} />
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
