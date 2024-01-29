/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';

import { UserContext } from '@/src/shared/context/';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './Login.module.css';
import BotaoRedondo from '@/src/components/botoes/BotaoRedondo';
import Link from 'next/link';
import InputFormulario from '../formulario/InputForm';

interface Inputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email('É necessário preencher um email válido')
    .required('É necessário preencher o campo de Email'),
  password: yup
    .string()
    .required('É necessário preencher o campo de senha')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
});

const LoginPage = () => {
  const { login } = React.useContext(UserContext);
  const [errorMessage, setErrorMessage] = React.useState<string | boolean>(
    false
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataUser = {
      email: data.email,
      password: data.password
    };

    setLoading(true);
    await login(dataUser, setErrorMessage, setLoading);
    setLoading(false);
  };

  return (
    <div>
      <form
        className={styles.form_container}
        action="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="titulo_sessao">Entre em sua conta</h1>

        <InputFormulario
          label="Email"
          register={register}
          name={'email'}
          placeholder={'seuemail@gmail.com'}
          type="email"
          error={errors?.email?.message}
        />
        <InputFormulario
          label="Senha"
          name="password"
          placeholder=""
          type="password"
          register={register}
          error={errors?.password?.message}
        />

        <p className={'texto_indicativo'}>
          Não possui uma conta? <Link href={'/registrar'}>Cadastre-se</Link>
        </p>
        <BotaoRedondo texto="Entrar" disabled={loading} />
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
