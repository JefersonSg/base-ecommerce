/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';

import styles from './Login.module.css';
import BotaoRedondo from '@/src/components/botoes/BotaoRedondo';
import Link from 'next/link';
const LoginPage = () => {
  // const [errorMessage, setErrorMessage] = React.useState<string | boolean>(
  //   false
  // );

  // Função de resetar e setar o span de erros

  return (
    <div>
      <form
        className={styles.form_container}
        action="POST"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="titulo_sessao">Entre em sua conta</h1>
        <div className={styles.divInput}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="text"
            id="email"
            // {...register('email')}
          />
          {/* <span className={styles.error}>{errors?.email?.message}</span> */}
        </div>
        <div className={styles.divInput}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            className={styles.input}
            type="password"
            // {...register('password')}
          />
          {/* <span className={styles.error}>{errors?.password?.message}</span> */}
        </div>
        <p className={'texto_indicativo'}>
          Não possui uma conta? <Link href={'/registrar'}>Cadastre-se</Link>
        </p>
        <BotaoRedondo texto="Entrar" />
      </form>
      {/* <span
        className={`${styles.error_span} ${errorMessage ? styles.ativo : ''}`}
      >
        {errorMessage}
      </span> */}
    </div>
  );
};

export default LoginPage;
