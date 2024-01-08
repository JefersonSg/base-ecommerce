'use client';

import React from 'react';
import styles from './Informacao.module.css';
import { SocialMedia } from './SocialMedia';
import { TituloSessao } from './TituloSessao';
import Link from 'next/link';

export function Informacao({
  titulo,
  img
}: {
  titulo: string;
  img?: string[];
}) {
  const [ativo, setAtivo] = React.useState<null | boolean>(null);

  function AtivarSessao() {
    if (ativo != null) {
      setAtivo(null);
    } else {
      setAtivo(true);
    }
  }

  return (
    <>
      <div className={styles.sessao} onClick={AtivarSessao}>
        <div>
          <TituloSessao titulo={titulo} ativo={ativo} />
        </div>
        {img != null && <SocialMedia img={img} />}

        {ativo != null && <Link href={'/aqui'}>Aqui</Link>}
      </div>
    </>
  );
}
