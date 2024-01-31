import React from 'react';
import styles from './NotFound.module.css';
import HeaderContainer from '../components/Header/HeaderContainer';
import { Footer } from '../components/Footer/Footer';

const NotFound = () => {
  return (
    <>
      <HeaderContainer />
      <div className={styles.notFound}>
        <h1 className="titulo_sessao">404 - Página não encontrada</h1>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
