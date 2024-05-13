'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { createBanner } from '@/src/shared/api/POST';
import { getAllActiveBanners, getAllBanners } from '@/src/shared/api/GETS';
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
    queryKey: ['banners-dashboard'],
    queryFn: getAllBanners
  });
  const bannerHome = useQuery({
    queryKey: ['banners-home'],
    queryFn: getAllActiveBanners
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

  const imageMobileWatch = watch('imageMobile');
  const imageDesktopWatch = watch('imageDesktop');
  const activeWatch = watch('active');

  const handleChange = React.useCallback(() => {
    if (imageMobileWatch?.[0]) {
      const imageUrl = URL?.createObjectURL(imageMobileWatch[0]);
      setImageUrl1(imageUrl);
    }
    if (imageDesktopWatch?.[0]) {
      const imageUrl2 = URL?.createObjectURL(imageDesktopWatch[0]);
      setImageUrl2(imageUrl2);
    }
  }, [imageDesktopWatch, imageMobileWatch]);

  React.useEffect(() => {
    handleChange();
  }, [handleChange]);

  const onSubmit: SubmitHandler<BannerTypeCreate> = async (data) => {
    setIsLoading(true);
    try {
      const response = await createBanner(data);
      setIsLoading(false);

      if (response) {
        setAtivo(false);
        setAtivoPopUp('Banner criado com sucesso');
        await refetch();
        await bannerHome.refetch();
      }
    } catch (error: any) {
      setAtivoPopUp(error?.data?.message);
      console.log(error);
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
          name="imageMobile"
          label="Imagem Mobile"
          placeholder=""
          register={register}
          type="file"
          error={errors?.imageMobile?.message}
        />
        <InputFormulario
          name="imageDesktop"
          label="Imagem Desktop"
          placeholder=""
          register={register}
          type="file"
          error={errors?.imageDesktop?.message}
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
            <label htmlFor="any">Desktop: 1920 x 600</label>
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
