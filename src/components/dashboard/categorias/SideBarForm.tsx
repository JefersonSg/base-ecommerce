'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonAdd from '../Botoes/ButtonAdd';

interface Inputs {
  title: string;
  slogan: string;
}

const schema = yup.object({
  title: yup
    .string()
    .min(3, 'É necessário preencher um email válido')
    .required('É necessário preencher o campo de Email'),
  slogan: yup
    .string()
    .required('É necessário preencher o campo de senha')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
});

const SideBarForm = ({
  setAtivo
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataUser = {
      title: data.title,
      slogan: data.slogan
    };

    console.log(dataUser);
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Adicione uma categoria</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <InputFormulario
          name="title"
          label="Titulo"
          placeholder="Digite o titulo da categoria"
          register={register}
          type="text"
          error={errors?.title?.message}
        />
        <InputFormulario
          name="slogan"
          label="Slogan"
          placeholder="Digite um texto descritivo"
          register={register}
          type="text"
          error={errors?.slogan?.message}
        />
        <ButtonAdd text="Add" />
      </form>
      <span
        className={styles.fechar}
        onClick={() => {
          setAtivo(false);
        }}
      >
        X
      </span>
    </div>
  );
};

export default SideBarForm;
