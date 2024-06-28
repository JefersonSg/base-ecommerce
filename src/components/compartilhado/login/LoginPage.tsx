/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React, { Suspense } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './Login.module.css';
import BotaoRedondo from '@/src/components/compartilhado/botoes/BotaoRedondo';
import Link from 'next/link';
import InputFormulario from '../formulario/InputForm';
import { useUserContext } from '@/src/shared/context';
import LoadingAnimation from '../loading/loadingAnimation';
import PopUpMessage from '../messages/PopUpMessage';

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
  const { login } = useUserContext();
  const [messagePopUp, setMessagePopUp] = React.useState<string>('');
  const [typePopUp, setTypePopUp] = React.useState<string>('');
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
    setMessagePopUp('');
    if (errors?.password?.message) {
      setMessagePopUp(errors?.password?.message);
      setTypePopUp('error');
    }
    if (errors?.email?.message) {
      setMessagePopUp(errors?.email?.message);
      setTypePopUp('error');
    }
  }, [errors]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataUser = {
      email: data.email,
      password: data.password
    };

    setLoading(true);
    await login(dataUser, setMessagePopUp, setLoading);
    setLoading(false);
    setMessagePopUp('Login realizado');
    setTypePopUp('');
  };

  return (
    <>
      <div>
        <form
          className={styles.form_container}
          action=""
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
        {messagePopUp && (
          <PopUpMessage
            setMessagePopUp={setMessagePopUp}
            setTypePopUp={setTypePopUp}
            text={messagePopUp}
            typePopUp={typePopUp}
          />
        )}
      </div>
      <Suspense>{loading && <LoadingAnimation />}</Suspense>
    </>
  );
};

export default LoginPage;
