import React, { type FormEvent } from 'react';
import axios from 'axios';

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
        .string('erro, necerrario preencher o campo de nome')
        .required('erro, necerrario preencher o campo de nome')
        .min(3, 'erro, o nome deve ter no minimo 3 caracteres'),
      password: yup
        .string('erro, necerrario preencher o campo de senha')
        .required('erro, necerrario preencher o campo de senha')
        .min(8, 'erro, A senha deve ter  no minimo 8 caracteres'),
      email: yup
        .string('erro, necerrario preencher o campo de nome')
        .email('erro, é necessario preencher um email valido')
        .required('erro, necerrario preencher o campo de nome')
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
      console.log(error?.errors);
      setError(error?.errors);
      return false;
    }
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // validationPost();

    if (!(await validate())) return true;
  }

  return (
    <div>
      <form
        action=""
        onSubmit={(e: FormEvent) => {
          handleSubmit(e);
        }}
      >
        <Input label="Nome" name="name" type="text" {...username} />
        <Input label="Email" name="email" type="email" {...email} />
        <Input label="Senha" name="password" type="password" {...password} />
        <BotaoRedondo texto="Entrar" />
      </form>
      {error && <span className={styles.error_span}>{error}</span>}
    </div>
  );
};

export default Login;
