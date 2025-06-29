'use client';

import React from 'react';
import styles from './MessageFloatingCart.module.css';
import Image from 'next/image';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import { useQuery } from '@tanstack/react-query';
import {
  type CartInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import Cookies from 'js-cookie';
import { getAllItemsCartByUserId, getUserByToken } from '@/src/shared/api/GETS';
import Link from 'next/link';

const MessageFloating = ({
  nameProduct,
  priceProduct,
  amount,
  typePopUp,
  img,
  setMessagePopUp,
  setTypePopUp
}: {
  nameProduct: string;
  priceProduct: number;
  amount: number;
  typePopUp: string;
  img: string;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const token = Cookies.get('auth_token');

  const userData = useQuery<UserInterface>({
    queryKey: ['user', token],
    queryFn: async () => {
      return (await getUserByToken(token)) as UserInterface;
    }
  });

  const { data, refetch } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData?.data?.user?._id],
    queryFn: async () => {
      return await getAllItemsCartByUserId(
        userData?.data?.user?._id.toString() ?? ''
      );
    }
  });

  function closeMessage() {
    setMessagePopUp('');
    setTypePopUp('');
  }

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setMessagePopUp('');
      setTypePopUp('');
    }, 6000);
    void refetch();
    return () => {
      clearTimeout(temporizador);
    };
  }, [setMessagePopUp, setTypePopUp, nameProduct, refetch]);

  return (
    <div
      className={`${styles.popUp} ${
        typePopUp === 'error' ? styles.error : styles.confirmation
      }`}
    >
      <div className={styles.informacao_produto}>
        <div className={styles.imagem_produto_div}>
          <Image
            alt="imagem do produto"
            width={80}
            height={80}
            src={img?.length ? img : '/confirm_popup.svg'}
            className={styles.foto_produto}
            unoptimized
          />
          <Image
            alt="Imagem de confirmação da adição"
            src={'/mensagem_flutuante/confirmação.svg'}
            width={14}
            height={14}
            className={styles.confirmacao_image}
            unoptimized
          />
        </div>
        <div className={styles.informacoes_carrinho}>
          <p className={styles.nome_produto}>{nameProduct}</p>
          <p className={styles.quantidade_valor}>
            {amount}x R${convertNumberInReal(priceProduct)}
          </p>
          <p className={styles.confirmacao}>
            Adicionado ao carrinho com sucesso!
          </p>
        </div>
      </div>
      <div className={styles.informacao_carrinho}>
        <p>
          Total <span>({data?.itemsCart?.length} produto)</span>
        </p>
        <p>R${convertNumberInReal(data?.totalValue ?? 0)}</p>
      </div>
      <Link href={'/carrinho'} className={styles.botao_carrinho}>
        Ver meu carrinho
      </Link>
      <span className={styles.fechar} onClick={closeMessage}>
        <Image
          className={styles.fechar}
          alt="X para fechar o pop up"
          src={'/mensagem_flutuante/fechar.svg'}
          width={19}
          unoptimized
          height={19}
        />
      </span>
    </div>
  );
};

export default MessageFloating;
