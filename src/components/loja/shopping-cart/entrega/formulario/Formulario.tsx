/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './Formulario.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputClean from '@/src/components/compartilhado/formulario/InputClean';
import { useQuery } from '@tanstack/react-query';
import { getAddress, getCep } from '@/src/shared/api/GETS';
import { type AddressInterface } from '@/src/shared/helpers/interfaces';
import BotaoRedondo from '@/src/components/compartilhado/botoes/BotaoRedondo';
import { updateAddress } from '@/src/shared/api/UPDATES';
import { createAddress } from '@/src/shared/api/CREATE';
import { validationFormAddress } from './validationFormAddress';
import EnderecoSalvo from '../EnderecoSalvo';

const Formulario = () => {
  const { data, refetch } = useQuery<{ address: AddressInterface }>({
    queryKey: ['address'],
    queryFn: getAddress
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(validationFormAddress)
  });

  const [ativoEdit, setAtivoEdit] = React.useState(false);
  const telefoneWatch = watch('telefone');
  const cpfWatch = watch('cpf');
  const CEPWatch = watch('cep');

  React.useEffect(() => {
    if (data?.address) {
      setValue('nome', data?.address?.nome);
      setValue('cpf', data?.address?.cpf);
      setValue('telefone', data?.address?.telefone);
      setValue('email', data?.address?.email);
      setValue('cep', data?.address?.cep);
      setValue('cidade', data?.address?.cidade);
      setValue('uf', data?.address?.uf);
      setValue('bairro', data?.address?.bairro);
      setValue('rua', data?.address?.rua);
      setValue('referencia', data?.address?.referencia);
      setValue('complemento', data?.address?.complemento);
      setValue('numero', data?.address?.numero);
    }
  }, [data, setValue]);

  // arrumar formato do telefone
  React.useEffect(() => {
    function formatPhoneNumber() {
      // Remove todos os caracteres que não sejam dígitos
      const cleaned = telefoneWatch?.replace(/\D/g, '');

      if (telefoneWatch?.length > 0) {
        // Formatar o número conforme necessário
        let formatted = '';
        if (cleaned.length >= 2) {
          formatted += `(${cleaned.substring(0, 2)})`;
          setValue('telefone', formatted);
        }
        if (cleaned.length > 2 && cleaned.length <= 7) {
          formatted += ` ${cleaned.substring(2)}`;
          setValue('telefone', formatted);
        }
        if (cleaned.length > 7) {
          formatted += ` ${cleaned.substring(2, 7)}-${cleaned.substring(
            7,
            11
          )}`;
          setValue('telefone', formatted);
        }
      }
    }
    formatPhoneNumber();
  }, [setValue, telefoneWatch]);

  React.useEffect(() => {
    function formatPhoneNumber() {
      // Remove todos os caracteres que não sejam dígitos
      const cleaned = telefoneWatch?.replace(/\D/g, '');

      if (telefoneWatch?.length > 0) {
        // Formatar o número conforme necessário
        let formatted = '';
        if (cleaned.length >= 2) {
          formatted += `(${cleaned.substring(0, 2)})`;
          setValue('telefone', formatted);
        }
        if (cleaned.length > 2 && cleaned.length <= 7) {
          formatted += ` ${cleaned.substring(2)}`;
          setValue('telefone', formatted);
        }
        if (cleaned.length > 7) {
          formatted += ` ${cleaned.substring(2, 7)}-${cleaned.substring(
            7,
            11
          )}`;
          setValue('telefone', formatted);
        }
      }
    }
    formatPhoneNumber();
  }, [setValue, telefoneWatch]);

  // arrumar formato do CPF
  React.useEffect(() => {
    function formatCPF() {
      // Remove todos os caracteres que não sejam dígitos
      const cleaned = cpfWatch?.replace(/\D/g, '');

      if (cpfWatch?.length > 0 && cpfWatch.length < 13) {
        // Formatar o CPF conforme necessário
        let formatted = '';
        for (let i = 0; i < cleaned.length; i++) {
          if (i > 0 && i % 3 === 0 && i < 9) {
            formatted += '.';
          }
          if (i === 9) {
            formatted += '-';
          }
          formatted += cleaned[i];
        }
        setValue('cpf', formatted);
      }
    }
    formatCPF();
  }, [setValue, cpfWatch]);

  React.useEffect(() => {
    async function fetchApi() {
      try {
        const responseApiCep =
          CEPWatch.length > 7 &&
          CEPWatch.length < 10 &&
          (await getCep(CEPWatch));
        const data: { consulta: { localidade: string; uf: string } } =
          responseApiCep;

        setValue('cidade', data?.consulta?.localidade);
        setValue('uf', data?.consulta?.uf);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    if (CEPWatch?.length >= 8) {
      void fetchApi();
    }
  }, [CEPWatch, setValue]);

  async function onSubmit<AddressInterface>(dataAddress: AddressInterface) {
    try {
      if (!data?.address) {
        const response = await createAddress(dataAddress);
        if (response) {
          await refetch();
          setAtivoEdit(false);
        }
        return;
      }
      const response = await updateAddress(data?.address?._id, dataAddress);

      if (response) {
        setAtivoEdit(false);
        await refetch();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {data?.address && <EnderecoSalvo data={data} />}
      {ativoEdit || !data?.address ? (
        <form
          className={styles.formulario_enderecos}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputClean
            label="Nome completo"
            name="nome"
            placeholder="Nome Completo"
            type="text"
            error={errors.nome}
            register={register}
          />
          <InputClean
            label="CPF"
            name="cpf"
            placeholder="123.456.789-00"
            type="text"
            maxLength={14}
            error={errors.cpf}
            register={register}
          />
          <InputClean
            label="Whatsapp"
            name="telefone"
            placeholder={'Ex: 21 99999-9999'}
            type="text"
            error={errors.telefone}
            register={register}
          />
          <InputClean
            label="Email"
            name="email"
            placeholder={'Ex: loja@gmail.com'}
            type="email"
            error={errors.email}
            register={register}
          />
          <InputClean
            label="CEP"
            name="cep"
            placeholder="CEP"
            type="text"
            error={errors.cep}
            maxLength={9}
            register={register}
          />
          <div className={styles.div_uf}>
            <InputClean
              label="Cidade"
              name="cidade"
              placeholder="Cidade"
              type="text"
              error={errors.cidade}
              register={register}
              disabled={true}
            />
            <InputClean
              label="UF"
              name="uf"
              placeholder="ex: RJ"
              type="text"
              error={errors.uf}
              register={register}
              disabled={true}
            />
          </div>
          <InputClean
            label="Rua"
            name="rua"
            placeholder="rua"
            type="text"
            error={errors.rua}
            register={register}
          />
          <InputClean
            label="Bairro"
            name="bairro"
            placeholder="Bairro"
            type="text"
            error={errors.bairro}
            register={register}
          />

          <InputClean
            label="Complemento"
            name="complemento"
            placeholder={'Ex: Ao lado da casa amarela...'}
            type="text"
            error={errors.complemento}
            register={register}
          />

          <div className={styles.input_casa}>
            <InputClean
              label="Referencia"
              name="referencia"
              placeholder={'Casa, Ap'}
              type="text"
              error={errors.referencia}
              register={register}
            />
            <InputClean
              label="Numero"
              name="numero"
              placeholder={'Numero'}
              type="number"
              error={errors.numero}
              register={register}
            />
          </div>

          <div className={styles.buttonSave}>
            <BotaoRedondo texto="Salvar" />
          </div>
        </form>
      ) : (
        <></>
      )}
      {data?.address && (
        <span
          className={styles.editar}
          onClick={() => {
            setAtivoEdit(!ativoEdit);
          }}
        >
          {ativoEdit ? 'Cancelar' : 'Editar'}
        </span>
      )}
    </>
  );
};

export default Formulario;
