/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import Image from 'next/image';
import styles from './Produto.module.css';

import Link from 'next/link';
import Like from '../../lottie/Like';
import {
  type UserInterface,
  type ProductApi,
  type CartInterface
} from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import { addNewItemCart } from '@/src/shared/api/POST';
import { useQuery } from '@tanstack/react-query';
import { getAllItemsCartByUserId, getUserByToken } from '@/src/shared/api/GETS';
import Cookies from 'js-cookie';
import React from 'react';

function Produto({
  productData,
  setIsLoading,
  setModalLogin,
  setMessagePopUp,
  setTypePopUp
}: {
  productData: ProductApi;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { _id, images, name, price, coverPhoto1, promotion, promotionalPrice } =
    productData;
  const token = Cookies.get('auth_token');
  const userData = useQuery<UserInterface>({
    queryKey: ['user', token],
    queryFn: async () => {
      return (await getUserByToken(token)) as UserInterface;
    }
  });
  const { refetch } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData.data?.user?._id],
    queryFn: async () => {
      if (userData.data?.user?._id) {
        return await getAllItemsCartByUserId(userData.data?.user?._id);
      }
      return [];
    }
  });

  async function addCartItem() {
    setMessagePopUp('');
    setTypePopUp('');

    if (!userData?.data?.user?._id) {
      setTypePopUp('error');
      setModalLogin(true);
      return;
    }

    const infosCartItem = {
      productId: _id,
      userId: userData?.data?.user?._id,
      size: productData?.size[0],
      color: productData?.colors?.[0] ?? '',
      amount: 1
    };

    try {
      setIsLoading(true);
      const response = await addNewItemCart(infosCartItem);
      void refetch();

      setTimeout(() => {
        setIsLoading(false);
      }, 700);

      if (response) {
        setMessagePopUp('Produdo adicionado ao carrinho');
        setTypePopUp('');
      } else {
        setTypePopUp('error');
        setMessagePopUp('Erro ao adicionar ao carrinho');
      }

      return response;
    } catch (error) {
      console.log(error);
      setTypePopUp('error');
      setTypePopUp('Erro ao adicionar ao carrinho');
      setIsLoading(false);
    }
  }

  const promotionPorcent = () => {
    if (promotionalPrice && promotion) {
      const diferenca = price - promotionalPrice;
      const porcentagem = (diferenca / price) * 100;
      return porcentagem.toFixed(0);
    }
    return null;
  };

  return (
    <>
      <Link
        href={`/produtos/produto/${_id}`}
        className={`${styles.produto} ${
          promotionPorcent() ? styles.promotion_active : ''
        }`}
      >
        <div className={styles.like}>
          <Like productId={_id} />
        </div>
        <div className={styles.imagem_div}>
          {promotionPorcent() ? (
            <span
              className={styles.promotion}
            >{`-${promotionPorcent()}%`}</span>
          ) : (
            ''
          )}
          {images && (
            <Image
              className={styles.imagem}
              alt="Imagem do produto"
              src={coverPhoto1?.length ? coverPhoto1 : images[0]}
              width={185}
              height={243}
              quality={75}
              placeholder="empty"
              sizes="(max-width: 1024px) 25vw, 50vw"
              property="true"
            />
          )}
        </div>
        <div className={styles.infos}>
          <p className={styles.nome_produto}>{name}</p>

          <div
            className={`${styles.div_preco} ${
              promotionPorcent() ? styles.promocao_preco : ''
            }`}
          >
            <span className={`${styles.preco}`}>
              R$ {convertNumberInReal(price)}
            </span>

            {promotionPorcent() ? (
              <p>R$ {convertNumberInReal(promotionalPrice ?? 0)}</p>
            ) : (
              ''
            )}
            <p className={styles.preco_parcelado}>
              ou <span>10x</span> de{' '}
              <span>
                R${' '}
                {convertNumberInReal(
                  promotionalPrice ? promotionalPrice / 10 : price / 10
                )}
              </span>
            </p>
          </div>
        </div>
        <button
          className={styles.botao_adicionar}
          onClick={(e) => {
            if (!userData?.data?.user?._id) {
              e.preventDefault();
              setModalLogin(true);
              return;
            }
            if (
              (productData?.colors && productData?.colors?.length <= 1) ??
              productData.size.length === 1
            ) {
              e.preventDefault();
              void addCartItem();
            }
          }}
        >
          Adicionar ao carrinho
        </button>
      </Link>
    </>
  );
}

export default Produto;
