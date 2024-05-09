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
import { getAllCategories, getAllSubcategories } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import { validationSubcategory } from './validationSubcategory';

interface Inputs {
  name: string;
  description: string;
  category: string;
  image: any;
}
interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const schema = validationSubcategory;

const SideBarFormCreateSubcategory = ({
  setAtivo,
  setAtivoPopUp
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoPopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //
  const { data } = useQuery<{ categories: Category[] }>({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  const { refetch } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
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
      setAtivoPopUp('Subcategoria criada com sucesso');
      await refetch();
    }
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

export default SideBarFormCreateSubcategory;
