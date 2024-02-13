'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { createCategory } from '@/src/shared/api/CREATE';
import { getAllCategories } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import { validationCategory } from './validationCategory';

interface Inputs {
  name: string;
  description: string;
  image: any;
}

const schema = validationCategory;

const SideBarFormCreate = ({
  setAtivo,
  setAtivoPopUp
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoPopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //
  const { refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const response = await createCategory(data);
    setIsLoading(false);

    if (response) {
      setAtivo(false);
      setAtivoPopUp('Categoria criada com sucesso');
      await refetch();
    }
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Adicione uma categoria</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <InputFormulario
          name="name"
          label="Nome"
          placeholder="Digite o nome da categoria"
          register={register}
          type="text"
          error={errors?.name?.message}
        />
        <InputFormulario
          name="description"
          label="Descrição"
          placeholder="Digite um texto descritivo"
          register={register}
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
          <ButtonAdd text="Criar" setAtivo={setAtivo} isLoading={isLoading} />
          <ButtonDelete
            text="Limpar formulario"
            setAtivo={setAtivo}
            isLoading={isLoading}
          />
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

export default SideBarFormCreate;
