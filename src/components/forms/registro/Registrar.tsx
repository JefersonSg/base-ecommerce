/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type FormEvent } from 'react';
// import axios from 'axios';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/src/components/forms/Input';

import styles from './Login.module.css';
import BotaoRedondo from '../../botoes/BotaoRedondo';
import { Span } from 'next/dist/trace';

interface Inputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email('Erro, é necessario preencher um email valido')
    .required('Erro, necerrario preencher o campo de nome'),
  password: yup
    .string()
    .required('Erro, necerrario preencher o campo de senha')
    .min(8, 'Erro, A senha deve ter  no minimo 8 caracteres')
});

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  const [error, setError] = React.useState<string | boolean>(false);

  React.useEffect(() => {
    setError(false);
    setTimeout(() => {
      setError(errors?.email?.message);
      setError(errors?.password?.message);
    }, 100);
    const temporizador = setTimeout(function closeError() {
      setError(false);
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [errors]);

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.divInput}>
          <label htmlFor="email">email</label>
          <input className={styles.input} type="text" {...register('email')} />
          <span className={styles.error}>{errors?.email?.message}</span>
        </div>
        <div className={styles.divInput}>
          <label htmlFor="password">password</label>
          <input
            className={styles.input}
            type="text"
            {...register('password')}
          />
          <span className={styles.error}>{errors?.password?.message}</span>
        </div>

        <BotaoRedondo texto="Entrar" />
      </form>
      <span className={`${styles.error_span} ${error ? styles.ativo : ''}`}>
        {error}
      </span>
    </div>
  );
};

export default Login;
