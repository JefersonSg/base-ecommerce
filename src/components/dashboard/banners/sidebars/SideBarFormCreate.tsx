'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { createBanner } from '@/src/shared/api/CREATE';
import { getAllBanners } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import { validationBanner } from './validationBanner';
import ToggleButtonCreate from '@/src/components/compartilhado/formulario/ToggleButtonCreate';
import { type BannerTypeCreate } from '@/src/shared/helpers/interfaces';
import Image from 'next/image';

const schema = validationBanner;

const SideBarFormCreate = ({
  setAtivo,
  setAtivoPopUp
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoPopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [imageUrl1, setImageUrl1] = React.useState<any>();
  const [imageUrl2, setImageUrl2] = React.useState<any>();
  const { refetch } = useQuery({
    queryKey: ['banners'],
    queryFn: getAllBanners
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<BannerTypeCreate>({
    resolver: yupResolver(schema),
    defaultValues: {
      active: true
    }
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const imagesWatch = watch('images');
  const activeWatch = watch('active');

  const handleChange = React.useCallback(() => {
    if (imagesWatch?.length > 0) {
      for (let i = 0; i < imagesWatch?.length; i++) {
        if (i === 0) {
          const imageUrl = URL.createObjectURL(imagesWatch[i]);
          setImageUrl1(imageUrl);
        } else if (i === 1) {
          const imageUrl = URL.createObjectURL(imagesWatch[i]);
          setImageUrl2(imageUrl);
        }
      }
    }
  }, [imagesWatch]);

  React.useEffect(() => {
    handleChange();
  }, [handleChange, imagesWatch]);

  const onSubmit: SubmitHandler<BannerTypeCreate> = async (data) => {
    setIsLoading(true);
    const response = await createBanner(data);
    setIsLoading(false);

    if (response) {
      setAtivo(false);
      setAtivoPopUp('Banner criado com sucesso');
      await refetch();
    }
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Adicione um novo banner</h2>
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
          name="link"
          label="Link do click"
          placeholder="Digite o link"
          register={register}
          type="text"
          error={errors?.link?.message}
        />
        <div className={styles.toggle_button_div}>
          <label htmlFor="active">Deseja ativar o banner?</label>
          <ToggleButtonCreate
            name="active"
            register={register}
            watchValue={activeWatch}
          />
        </div>
        <InputFormulario
          name="images"
          label="Imagem"
          multiple={true}
          placeholder=""
          register={register}
          type="file"
          error={errors?.images?.message}
        />
        <div className={styles.view_banners_div}>
          <div>
            <label htmlFor="any">Mobile: 420 x 490</label>
            {imageUrl1 && (
              <Image
                alt="imagem mobile"
                src={imageUrl1}
                width={50}
                height={50}
              />
            )}
          </div>

          <div>
            <label htmlFor="any">Desktop: 1920 x 430</label>
            {imageUrl2 && (
              <Image
                alt="imagem Desktop"
                src={imageUrl2}
                width={100}
                height={50}
              />
            )}
          </div>
        </div>

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
