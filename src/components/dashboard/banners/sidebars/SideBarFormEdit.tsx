'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { updateBanner } from '@/src/shared/api/UPDATES';
import { useQuery } from '@tanstack/react-query';
import { getAllBanners } from '@/src/shared/api/GETS';
import { validationBannerEdit } from './validationBannerEdit';
import {
  type BannerType,
  type BannerTypeEdit
} from '@/src/shared/helpers/interfaces';
import ToggleButtonCreate from '@/src/components/compartilhado/formulario/ToggleButtonCreate';
import Image from 'next/image';
import { revalidateTagAction } from '@/src/actions/revalidates';

const schema = validationBannerEdit;

const SideBarFormEdit = ({
  bannerData,
  setAtivo
}: {
  bannerData: BannerType;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<BannerTypeEdit>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: bannerData.name,
      link: bannerData?.link,
      active: bannerData?.active
    }
  });

  const { refetch } = useQuery({
    queryKey: ['banners-dashboard'],
    queryFn: getAllBanners
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl1, setImageUrl1] = React.useState<any>();
  const [imageUrl2, setImageUrl2] = React.useState<any>();

  const activeWatch = watch('active');
  const imageMobileWatch = watch('imageMobile');
  const imageDesktopWatch = watch('imageDesktop');

  const handleChange = React.useCallback(() => {
    if (imageMobileWatch?.[0]) {
      const imageUrl = URL?.createObjectURL(imageMobileWatch?.[0]);
      setImageUrl1(imageUrl);
    }
    if (imageDesktopWatch?.[0]) {
      const imageUrl2 = URL?.createObjectURL(imageDesktopWatch?.[0]);
      setImageUrl2(imageUrl2);
    }
  }, [imageDesktopWatch, imageMobileWatch]);

  React.useEffect(() => {
    handleChange();
  }, [handleChange]);

  const onSubmit: SubmitHandler<BannerTypeEdit> = async (data) => {
    setIsLoading(true);

    await updateBanner(bannerData._id, data);
    await revalidateTagAction('all-active-banners');
    await refetch();
    setIsLoading(false);
    setAtivo(false);
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Edite o Banner</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <InputFormulario
          name="name"
          label="Nome"
          placeholder="Digite o nome do banner"
          register={register}
          type="text"
          error={errors?.name?.message}
        />
        <InputFormulario
          name="link"
          label="Link"
          placeholder="Digite o Link"
          register={register}
          defaultValue={bannerData.link}
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
          error={errors?.imageDesktop?.message}
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
            <Image
              alt="imagem mobile"
              src={imageUrl1 ?? bannerData.imageMobile ?? ''}
              width={50}
              height={50}
            />
          </div>

          <div>
            <label htmlFor="any">Desktop: 1920 x 600</label>
            <Image
              alt="imagem Desktop"
              src={imageUrl2 ?? bannerData.imageDesktop ?? ''}
              width={100}
              height={50}
            />
          </div>
        </div>

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
