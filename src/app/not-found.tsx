import React from 'react';
import styles from './NotFound.module.css';
import { Footer } from '../components/loja/Footer/Footer';
import { Header } from '../components/loja/Header/Header';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className={styles.notFound}>
        <h1 className="titulo_sessao">404 - Página não encontrada</h1>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
