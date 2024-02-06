'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';

interface Inputs {
  title: string;
  description: string;
  image: any;
}

const schema = yup.object({
  title: yup.string().required('É necessário preencher o campo de Titulo'),
  description: yup
    .string()
    .required('É necessário preencher o campo de slogan'),
  image: yup
    .mixed()
    .required()
    .test('length', 'Por favor, selecione a imagem', (value: any) => {
      return !!value[0];
    })
    .test(
      'fileType',
      'o arquivo não é suportado, use uma foto PNG ou JPG',
      (value: any) => {
        return (
          (value[0] ? value[0]?.type === 'image/png' : true) ||
          (value[0] ? value[0]?.type === 'image/jpg' : true)
        );
      }
    )
    .test('fileSize', 'o arquivo é muito grande', (value: any) => {
      console.log(value[0]);
      return value[0] ? value[0]?.size <= 1024 * 1024 : true;
    })
});

const SideBarFormEdit = ({
  title,
  description,
  image,
  setAtivo
}: {
  title: string;
  description: string;
  image: string[];
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  // const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataCategory = {
      title: data.title,
      image: data.image,
      description: data.description
    };

    console.log(dataCategory);
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
          defaultValue={title}
          type="text"
          error={errors?.title?.message}
        />
        <InputFormulario
          name="description"
          label="Descrição"
          placeholder="Digite um texto descritivo"
          register={register}
          defaultValue={description}
          type="text"
          error={errors?.description?.message}
        />
        <InputFormulario
          name="image"
          label="Imagem"
          placeholder=""
          register={register}
          type="file"
          error={errors?.image?.message}
        />

        <div className={styles.botoes}>
          <ButtonAdd text="Salvar" setAtivo={setAtivo} />
          <ButtonDelete text="Apagar Edições" setAtivo={setAtivo} />
        </div>
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

export default SideBarFormEdit;
