/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './Registro.module.css';

import { useUserContext } from '@/src/shared/context/';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BotaoRedondo from '@/src/components/compartilhado/botoes/BotaoRedondo';
import Link from 'next/link';
import InputFormulario from '@/src/components/compartilhado/formulario/InputForm';
import LoadingAnimation from '../../compartilhado/loading/loadingAnimation';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';

interface InputsRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const schema = yup.object({
  name: yup
    .string()
    .min(3, 'O nome deve ter no minimo 3 caracteres')
    .required('É necessário preencher o seu Nome'),
  surname: yup
    .string()
    .min(3, 'O nome deve ter no minimo 3 caracteres')
    .required('É necessário preencher o seu Nome'),
  email: yup
    .string()
    .email('É necessário preencher um email válido')
    .required('É necessário preencher o campo de Email'),
  password: yup
    .string()
    .required('É necessário preencher o campo de senha')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas digitadas devem ser iguals')
    .required('É necessário preencher o campo de confirmação de senha')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
});

const Registro = () => {
  const { registerUser } = useUserContext();

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

  // Função de setar o span de erros
  React.useEffect(() => {
    if (errors?.name?.message) {
      setMessagePopUp(errors?.name?.message);
      setTypePopUp('error');
    }
    if (errors?.surname?.message) {
      setMessagePopUp(errors?.surname?.message);
      setTypePopUp('error');
    }
    if (errors?.email?.message) {
      setMessagePopUp(errors?.email?.message);
      setTypePopUp('error');
    }
    if (errors?.password?.message) {
      setMessagePopUp(errors?.password?.message);
      setTypePopUp('error');
    }
    if (errors?.confirmpassword?.message) {
      setMessagePopUp(errors?.confirmpassword?.message);
      setTypePopUp('error');
    }
  }, [errors]);

  const onSubmit: SubmitHandler<InputsRegister> = async (data) => {
    const dataUser = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword
    };

    setLoading(true);
    await registerUser(dataUser, setMessagePopUp, setTypePopUp, setLoading);
    setLoading(false);
    setMessagePopUp('Registro concluido');
    setTypePopUp('');
  };

  return (
    <>
      {loading && <LoadingAnimation />}
      <div>
        <form
          action=""
          className={styles.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="titulo_sessao">Crie a sua conta</h1>

          <InputFormulario
            name="name"
            label="Nome"
            type="text"
            placeholder="Digite seu nome"
            register={register}
            error={errors?.name?.message}
          />
          <InputFormulario
            name="surname"
            label="Sobrenome"
            type="text"
            placeholder="Digite seu sobrenome"
            register={register}
            error={errors?.surname?.message}
          />
          <InputFormulario
            name="email"
            label="Email"
            type="email"
            placeholder={'email@gmail.com'}
            register={register}
            error={errors?.email?.message}
          />
          <InputFormulario
            name="password"
            label="Senha"
            type="password"
            placeholder={''}
            register={register}
            error={errors?.password?.message}
          />
          <InputFormulario
            name="confirmpassword"
            label="Confirme sua senha"
            type="password"
            placeholder={''}
            register={register}
            error={errors?.confirmpassword?.message}
          />

          <p className={'texto_indicativo'}>
            Já possui uma conta? <Link href={'/login'}>Faça login</Link>
          </p>

          <BotaoRedondo texto="Entrar" disabled={loading} />
        </form>
        <span
          className={`${styles.error_span} ${messagePopUp ? styles.ativo : ''}`}
        >
          {messagePopUp && (
            <PopUpMessage
              setMessagePopUp={setMessagePopUp}
              setTypePopUp={setTypePopUp}
              text={messagePopUp}
              typePopUp={typePopUp}
            />
          )}
        </span>
      </div>
    </>
  );
};

export default Registro;
