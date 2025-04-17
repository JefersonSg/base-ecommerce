import styles from './interacoes.module.css';
import Favotiro from './Favotiro';
import Compartilhar from './Compartilhar';
import Update from './Update';
import React, { Suspense } from 'react';
import EstrelasProduto from './EstrelasProduto';

async function Interacoes({ id }: { id: string }) {
  return (
    <div className={styles.interatividades}>
      <Suspense fallback={<div className={styles.start_loading}></div>}>
        <EstrelasProduto id={id} />
      </Suspense>
      <div className={styles.interacao}>
        <Update id={id} />
        <Suspense>
          <Favotiro productId={id} />
        </Suspense>
        <Compartilhar />
      </div>
    </div>
  );
}

export default Interacoes;
