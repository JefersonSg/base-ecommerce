'use client';

/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './SidebarForm.module.css';
import InputFormulario from '../../../compartilhado/formulario/InputForm';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ButtonAdd from '../../Botoes/ButtonAdd';
import ButtonDelete from '../../Botoes/ButtonDelete';
import { createNewCupom } from '@/src/shared/api/POST';
import { getAllCupons } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import { validationCupom } from './validationCupom';
import ToggleButtonCreate from '@/src/components/compartilhado/formulario/ToggleButtonCreate';
import { type cuponsInterface } from '@/src/shared/helpers/interfaces';

const schema = validationCupom;

const SideBarFormCreate = ({
  setAtivo,
  setAtivoPopUp
}: {
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoPopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { refetch } = useQuery({
    queryKey: ['cupons-dashboard'],
    queryFn: getAllCupons
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      active: true,
      limitUses: null,
      minimumValue: null,
      percentageDiscount: null
    }
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const activeWatch = watch('active');

  const onSubmit: SubmitHandler<cuponsInterface> = async (data) => {
    setIsLoading(true);
    try {
      const response = await createNewCupom(data);
      setIsLoading(false);

      if (response && !response?.response?.data?.erro) {
        setAtivo(false);
        setAtivoPopUp('Cupom criado com sucesso');
        await refetch();
      }
      if (response?.response?.data?.erro) {
        setAtivoPopUp(response?.response?.data?.erro);
      }
    } catch (error: any) {
      setAtivoPopUp(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className={styles.sidebar_form}>
      <h2>Adicione um novo CUPOM</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <InputFormulario
          name="code"
          label="Código"
          placeholder="Digite o codigo do cupom"
          register={register}
          type="text"
          error={errors?.code?.message}
        />

        <InputFormulario
          name="percentageDiscount"
          label={'Porcentagem de desconto'}
          placeholder="10"
          register={register}
          type="number"
          error={errors?.percentageDiscount?.message}
        />
        <InputFormulario
          name="limitUses"
          label="Limite de cupons (opcional)"
          placeholder="15"
          register={register}
          type="number"
          error={errors?.limitUses?.message}
        />
        <InputFormulario
          name="minimumValue"
          label="Valor mínimo para uso (opcional)"
          placeholder="250"
          register={register}
          type="number"
          error={errors?.minimumValue?.message}
        />
        <div className={styles.toggle_button_div}>
          <label htmlFor="active">Deseja ativar o cupom Agora?</label>
          <ToggleButtonCreate
            name="active"
            register={register}
            watchValue={activeWatch}
          />
        </div>
        <InputFormulario
          name="expiration"
          label="Data de expiração (opcional)"
          placeholder=""
          register={register}
          type="date"
          error={errors?.expiration?.message}
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
