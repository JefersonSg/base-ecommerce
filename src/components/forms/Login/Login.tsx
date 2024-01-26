/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type FormEvent } from 'react';
// import axios from 'axios';

import * as yup from 'yup';
import Input from '@/src/components/forms/Input';
import useForm from '@/src/shared/hooks/useForm';

import styles from './Login.module.css';
import BotaoRedondo from '../../botoes/BotaoRedondo';

const Login = () => {
  const username = useForm('name');
  const email = useForm('email');
  const password = useForm('password');

  const [error, setError] = React.useState<string | boolean>(false);

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setError(false);
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [error]);

  async function validate() {
    const validationPost = yup.object().shape({
      name: yup
        .string()
        .required('Erro, necerrario preencher o campo de nome')
        .min(3, 'Erro, o nome deve ter no minimo 3 caracteres'),
      password: yup
        .string()
        .required('Erro, necerrario preencher o campo de senha')
        .min(8, 'Erro, A senha deve ter  no minimo 8 caracteres'),
      email: yup
        .string()
        .email('Erro, é necessario preencher um email valido')
        .required('Erro, necerrario preencher o campo de nome')
    });

    try {
      await validationPost.validate({
        name: username.value,
        email: email.value,
        password: password.value
      });

      setError('');
      return true;
    } catch (error) {
      setError((error as any)?.errors || 'Erro desconhecido');
      return false;
    }
  }
  async function handleSubmit(e?: FormEvent) {
    e?.preventDefault();

    if (!(await validate())) return true;
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Nome" name="name" type="text" {...username} />
        <Input label="Email" name="email" type="email" {...email} />
        <Input label="Senha" name="password" type="password" {...password} />
        <BotaoRedondo texto="Entrar" />
      </form>
      <span className={`${styles.error_span} ${error ? styles.ativo : ''}`}>
        {error}
      </span>
    </div>
  );
};

export default Login;
