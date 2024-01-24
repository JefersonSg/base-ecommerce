'use client';

import styles from './SectionColecoes.module.css';

import SlideColecoes from './SlideColecoes';

function SectionColecoes() {
  return (
    <div className={styles.container}>
      <h2 className={'titulo_sessao'}>Novas coleções</h2>
      <div className={styles.colecoes}>
        <SlideColecoes />
      </div>
    </div>
  );
}

export default SectionColecoes;
