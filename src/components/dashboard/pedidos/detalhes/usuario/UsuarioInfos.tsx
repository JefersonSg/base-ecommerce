'use client';

import React from 'react';
import styles from './UsuarioInfos.module.css';
import { useQuery } from '@tanstack/react-query';
import { getOrderByUserId, getUserById } from '@/src/shared/api/GETS';
import {
  type AddressInterface,
  type OrderInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import Image from 'next/image';

const UsuarioInfos = ({
  userId,
  address
}: {
  userId: string;
  address: AddressInterface;
}) => {
  const { data } = useQuery<UserInterface>({
    queryKey: ['user' + userId],
    queryFn: async () => {
      return await getUserById(userId);
    }
  });
  const dataOrder = useQuery<{ pedidos: OrderInterface[] }>({
    queryKey: ['order-by-user-id' + userId],
    queryFn: async () => {
      return await getOrderByUserId(userId);
    }
  });

  return (
    <div className={`table ${styles.usuario_infos}`}>
      <p className={styles.texto}>Detalhes do cliente</p>
      <div className={styles.cliente_pedido}>
        <div className={styles.imagemPerfil}>
          <Image
            alt="Foto de perfil do clente"
            src={`${data?.user?.image ?? '/profile/profile.svg'}`}
            fill={true}
          />
        </div>
        <div>
          <p className={`${styles.name} ${styles.texto_estilo_1}`}>
            {data?.user?.name ?? 'Não encontrado'}
          </p>
          <p className={`${styles.email} ${styles.texto_estilo_2}`}>
            {data?.user?.email}
          </p>
        </div>
      </div>
      <div className={styles.numero_pedidos}>
        <div className={styles.imagem_carrinho}>
          <Image
            alt="Imagem de carrinho"
            src={'/header/icons/carrinho.svg'}
            width={20}
            height={20}
          />
        </div>
        <p className={styles.texto_estilo_1}>
          {dataOrder.data?.pedidos?.length} Pedidos
        </p>
      </div>

      <div className={styles.endereco}>
        <p className={styles.texto_estilo_1}>Endereço de entrega</p>
        <div>
          <div className={styles.pessoa}>
            <p>Nome: {address.nome}</p>
            <p>CPF: {address.cpf}</p>
            <p>Email: {address.email}</p>
            <p>Telefone: {address.telefone}</p>
          </div>
          <div className={styles.entrega}>
            <p>CEP: {address.cep}</p>
            <p>
              Cidade/UF: {address.cidade} / {address.uf}
            </p>
            <p>Bairro: {address.bairro}</p>
            <p>Rua: {address.rua}</p>
            <p>Número: {address.numero}</p>
            <p>Referencia: {address.referencia}</p>
            <p>Complemento: {address.complemento}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioInfos;
