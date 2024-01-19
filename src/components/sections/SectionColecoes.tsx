'use client';

import styles from './SectionColecoes.module.css';
import { TituloSessao } from '../textos/TituloSessao';

import SlideColecoes from './SlideColecoes';

function SectionColecoes() {
  return (
    <div className={styles.container}>
      <TituloSessao titulo="Novas coleções" />
      <div className={styles.colecoes}>
        <SlideColecoes />
      </div>
    </div>
  );
}

export default SectionColecoes;
