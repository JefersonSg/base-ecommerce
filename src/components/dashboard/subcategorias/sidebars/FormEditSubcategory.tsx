'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { updateSubcategory } from '@/src/shared/api/UPDATES';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getAllSubcategories } from '@/src/shared/api/GETS';
import { validationSubcategoryEdit } from './validationSubcategoryEdit';

interface Inputs {
  name: string;
  description: string;
  category: string;
  image?: any;
}

const schema = validationSubcategoryEdit;

const SideBarFormEdit = ({
  idSubcategory,
  name,
  category,
  description,
  setAtivo
}: {
  idSubcategory: string;
  name: string;
  description: string;
  category: string;
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
      category,
      description
    }
  });

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  const { refetch } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const response = await updateSubcategory(data, idSubcategory);
    if (response) {
      await refetch();
      setAtivo(false);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Edite a Subcategoria</h2>
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
          <select
            id="category"
            className={styles.category}
            {...register('category')}
            defaultValue={category}
          >
            <option value="outros">Outros</option>
            {data?.categories?.map((categoryAPI: any) => {
              return (
                <option key={categoryAPI._id} value={categoryAPI._id}>
                  {categoryAPI.name}
                </option>
              );
            })}
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
