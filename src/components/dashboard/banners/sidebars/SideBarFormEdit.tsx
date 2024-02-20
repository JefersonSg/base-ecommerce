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
import { getAllCategories } from '@/src/shared/api/GETS';
import { validationCategoryEdit } from './validationBannerEdit';
import {
  type BannerType,
  type BannerTypeEdit
} from '@/src/shared/helpers/interfaces';

const schema = validationCategoryEdit;

const SideBarFormEdit = ({
  data,
  bannerId,
  name,
  description,
  image,
  setAtivo
}: {
  data: BannerType;
  bannerId: string;
  name: string;
  description: string;
  image: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BannerTypeEdit>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data.name,
      link: data?.link,
      active: data?.active
    }
  });

  const { refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<BannerTypeEdit> = async (data) => {
    setIsLoading(true);
    await updateCategory(data, bannerId);
    await refetch();
    setIsLoading(false);
    setAtivo(false);
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
          defaultValue={name}
          type="text"
          error={errors?.name?.message}
        />
        <InputFormulario
          name="link"
          label="Link"
          placeholder="Digite o Link"
          register={register}
          defaultValue={description}
          type="text"
          error={errors?.link?.message}
        />
        <InputFormulario
          name="active"
          label="Mostrar na loja?"
          placeholder="banner"
          register={register}
          defaultValue={description}
          type="text"
          error={errors?.active?.message}
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
