'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { createSubcategory } from '@/src/shared/api/POST';
import { useQuery } from '@tanstack/react-query';
import { validationSubcategory } from './validationSubcategory';
import categoriesGetAll from '@/src/actions/category-get-all';
import subcategoriesGetAll from '@/src/actions/subcategory-get-all';

interface Inputs {
  name: string;
  description: string;
  category: string;
  image: any;
}

const schema = validationSubcategory;

const SideBarFormCreateSubcategory = ({
  setAtivo,
  setMessagePopUp,
  setTypePopUp
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //
  const { data } = useQuery({
    queryKey: ['categories-get-all'],
    queryFn: async () => await categoriesGetAll()
  });
  const { refetch } = useQuery({
    queryKey: ['subcategories-get-all'],
    queryFn: async () => await subcategoriesGetAll()
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
    const response = await createSubcategory(data);
    setIsLoading(false);

    if (response) {
      setAtivo(false);
      setMessagePopUp('Subcategoria criada com sucesso');
      await refetch();
      return;
    }
    setTypePopUp('error');
    setMessagePopUp('erro ao criar Subcategoria');
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Adicione uma Subcategoria</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <InputFormulario
          name="name"
          label="Nome"
          placeholder="Digite o nome da Subcategoria"
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
        <div className={styles.select_categoria}>
          <label htmlFor="subcategory">Categoria</label>
          <select
            id="subcateogry"
            className={styles.category}
            {...register('category')}
          >
            <option value="" disabled style={{ display: 'none' }}></option>
            {data?.categories?.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
            {!data?.categories[0] && (
              <option value={''}>Nenhuma categoria</option>
            )}
          </select>
        </div>
        <InputFormulario
          name="image"
          label="Imagem: 1080 x 1080"
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

export default SideBarFormCreateSubcategory;
