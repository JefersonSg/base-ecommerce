'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Context } from '@/src/shared/context/';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './Login.module.css';
import BotaoRedondo from '@/src/components/botoes/BotaoRedondo';
import Link from 'next/link';

interface Inputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email(' É necessario preencher um email valido')
    .required('É necerrario preencher o campo de Email'),
  password: yup
    .string()
    .required('É necerrario preencher o campo de senha')
    .min(8, ' A senha deve ter  no minimo 8 caracteres')
});

const LoginPage = () => {
  const { login } = React.useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [errorMessage, setErrorMessage] = React.useState<string | boolean>(
    false
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataUser = {
      email: data.email,
      password: data.password
    };

    await login(dataUser, setErrorMessage);
  };

  // Função de resetar e setar o span de erros
  React.useEffect(() => {
    setErrorMessage(false);
    setTimeout(() => {
      if (errors?.password?.message) {
        setErrorMessage(errors?.password?.message);
      }
      if (errors?.email?.message) {
        setErrorMessage(errors?.email?.message);
      }
    }, 100);
    const temporizador = setTimeout(function closeError() {
      setErrorMessage(false);
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errors]);

  return (
    <div>
      <form
        className={styles.form_container}
        action="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="titulo_sessao">Entre em sua conta</h1>
        <div className={styles.divInput}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="text"
            id="email"
            {...register('email')}
          />
          <span className={styles.error}>{errors?.email?.message}</span>
        </div>
        <div className={styles.divInput}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            className={styles.input}
            type="text"
            {...register('password')}
          />
          <span className={styles.error}>{errors?.password?.message}</span>
        </div>
        <p className={'texto_indicativo'}>
          Não possui uma conta? <Link href={'/registrar'}>Cadastre-se</Link>
        </p>
        <BotaoRedondo texto="Entrar" />
      </form>
      <span
        className={`${styles.error_span} ${errorMessage ? styles.ativo : ''}`}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default LoginPage;
