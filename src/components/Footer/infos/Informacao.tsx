'use client';

import React from 'react';
import styles from './Informacao.module.css';
import { SocialMedia } from './SocialMedia';
import { TituloFooter } from './TituloFooter';

export function Informacao({
  titulo,
  img,
  seta
}: {
  titulo: string;
  img?: string[];
  seta: boolean;
}) {
  const [ativo, setAtivo] = React.useState<null | boolean>(null);

  function AtivarSection() {
    if (ativo != null) {
      setAtivo(null);
    } else {
      setAtivo(true);
    }
  }

  return (
    <nav className={styles.sessao} onClick={AtivarSection}>
      <TituloFooter titulo={titulo} ativo={ativo} seta={seta} />
      {img != null && <SocialMedia img={img} />}

      {ativo != null && seta && (
        <div>
          Horário de atendimento seg a sex das 9h às 18h sab das 9:30h às 13h
        </div>
      )}
    </nav>
  );
}
