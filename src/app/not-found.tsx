import React from 'react';
import styles from './NotFound.module.css';
import { Titulo } from '../components/textos/Titulo';
import { TituloArea } from '../components/textos/TituloArea';
import { TituloSessao } from '../components/textos/TituloSessao';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <TituloSessao titulo="404 - Página não encontrada" />
    </div>
  );
};

export default NotFound;
