import styles from './interacoes.module.css';
import Favotiro from './Favotiro';
import Compartilhar from './Compartilhar';
import Update from './Update';
import React from 'react';
import EstrelasProduto from './EstrelasProduto';
import InteracoesUserModalCompartilhar from './compartilhar/modal-compartilhar';

async function Interacoes({ id, stars }: { id: string; stars: number }) {
  return (
    <>
      <div className={styles.interatividades}>
        <EstrelasProduto stars={stars} />
        <div className={styles.interacao}>
          <Update id={id} />
          <Favotiro productId={id} />
          <Compartilhar />
        </div>
      </div>
      <InteracoesUserModalCompartilhar />
    </>
  );
}

export default Interacoes;
