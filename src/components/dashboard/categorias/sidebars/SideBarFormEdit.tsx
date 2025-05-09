'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { updateCategory } from '@/src/shared/api/UPDATES';
import { useQuery } from '@tanstack/react-query';
import { validationCategoryEdit } from './validationCategoryEdit';
import categoriesGetAll from '@/src/actions/category-get-all';

interface Inputs {
  name: string;
  description: string;
  image?: any;
}

const schema = validationCategoryEdit;

const SideBarFormEdit = ({
  idCategory,
  name,
  description,
  setAtivo,
  setMessagePopUp,
  setTypePopUp
}: {
  idCategory: string;
  name: string;
  description: string;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name,
      description
    }
  });

  const { refetch } = useQuery({
    queryKey: ['categories-get-all'],
    queryFn: async () => await categoriesGetAll()
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const response = await updateCategory(data, idCategory);
    if (response) {
      setIsLoading(false);
      setAtivo(false);
      await refetch();
      setMessagePopUp('Categoria atualizada');
      setTypePopUp('');
      return;
    }

    setMessagePopUp('Erro ao atualizar categoria');
    setTypePopUp('error');
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Edite a categoria</h2>
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
          label="Imagem: 1080 x 1080"
          placeholder=""
          register={register}
          type="file"
          error={errors?.image?.message}
        />

        <div className={styles.botoes}>
          <ButtonAdd text="Salvar" setAtivo={setAtivo} isLoading={isLoading} />
          <ButtonDelete
            text="Apagar Edições"
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

export default SideBarFormEdit;
