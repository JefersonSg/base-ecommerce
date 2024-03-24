/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import Image from 'next/image';
import BotaoRedondo from '../../../compartilhado/botoes/BotaoRedondo';
import styles from './Usuario.module.css';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import InputClean from '@/src/components/compartilhado/formulario/InputClean';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { validationUser } from './validationUser';
import React from 'react';
import InputFormulario from '@/src/components/compartilhado/formulario/InputForm';
import { updateUser } from '@/src/shared/api/UPDATES';
import { useRouter } from 'next/navigation';
import { revalidatePathAction } from '@/src/actions/revalidates';
interface userEdit {
  name: string;
  surname: string;
  image?: any;
}
export default function ProfileUSuario({
  userData
}: {
  userData: UserInterface;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const schema = validationUser;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<userEdit>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userData.user.name,
      surname: userData.user.surname
    }
  });

  const imageUser = watch('image');

  const handleChange = React.useCallback(() => {
    if (imageUser?.[0]) {
      const newUrl = URL?.createObjectURL(imageUser?.[0]);
      setImageUrl(newUrl);
    }
  }, [imageUser]);

  React.useEffect(() => {
    handleChange();
  }, [handleChange]);

  const onSubmit: SubmitHandler<userEdit> = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateUser(data, userData.user._id);
      setIsLoading(false);

      if (response) {
        await revalidatePathAction('/minha-conta');
        router.push('/minha-conta');
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <form className={styles.usuario_div} onSubmit={handleSubmit(onSubmit)}>
      <Image
        src={imageUrl ?? userData?.user?.image ?? '/profile/profile.svg'}
        alt="Foto de perfil do usuario"
        width={84}
        height={84}
      />
      <InputFormulario
        label="Editar"
        name="image"
        placeholder=""
        type="file"
        error={errors.image}
        register={register}
      />
      <InputClean
        error={errors.name}
        label="Nome"
        name="name"
        placeholder="Digite seu nome"
        type="text"
        register={register}
      />
      <InputClean
        error={errors.name}
        label="Sobrenome"
        name="surname"
        placeholder="Digite seu Sobrenome"
        type="text"
        register={register}
      />

      <BotaoRedondo texto="Salvar" style2={true} disabled={isLoading} />
    </form>
  );
}
