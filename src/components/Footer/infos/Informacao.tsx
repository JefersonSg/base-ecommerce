'use client';

import React from 'react';
import styles from './Informacao.module.css';
import { SocialMedia } from './SocialMedia';
import { TituloSessao } from './TituloSessao';
import Link from 'next/link';

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
      <TituloSessao titulo={titulo} ativo={ativo} seta={seta} />
      {img != null && <SocialMedia img={img} />}

      {ativo != null && seta && <Link href={'/aqui'}>Aqui</Link>}
    </nav>
  );
}
