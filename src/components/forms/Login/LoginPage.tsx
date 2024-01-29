'use client';

import React from 'react';

import styles from './Login.module.css';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div>
      <form
        className={styles.form_container}
        action="POST"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="titulo_sessao">Entre em sua conta</h1>
        <div className={styles.divInput}>
          <label htmlFor="email">Email</label>
          <input className={styles.input} type="text" id="email" name="email" />
        </div>
        <div className={styles.divInput}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            className={styles.input}
            type="password"
            name="password"
          />
        </div>
        <p className={'texto_indicativo'}>
          Não possui uma conta? <Link href={'/registrar'}>Cadastre-se</Link>
        </p>
        <button></button>
      </form>
      <span></span>
    </div>
  );
};

export default LoginPage;
