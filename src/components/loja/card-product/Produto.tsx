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
import ImagemProduto from './ImagemProduto';
import setNewCookie from '@/src/actions/setCookie';
import getCookie from '@/src/actions/getCookie';

function Produto({
  productData,
  setIsLoading,
  setModalLogin,
  setMessagePopUp,
  setTypePopUp,
  setNameProduct,
  setPriceProduct,
  setImageProduct
}: {
  productData: ProductApi;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  setNameProduct: React.Dispatch<React.SetStateAction<string>>;
  setPriceProduct: React.Dispatch<React.SetStateAction<number>>;
  setImageProduct: React.Dispatch<React.SetStateAction<string>>;
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
    queryKey: ['shopping-cart', userData?.data?.user?._id],
    queryFn: async () => {
      if (userData.data?.user?._id) {
        return await getAllItemsCartByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });

  async function addCartItem() {
    setMessagePopUp('');
    setTypePopUp('');

    const cookie = await getCookie({ nameCookie: 'cart_id' });

    const infosCartItem = {
      productId: _id,
      userId: userData?.data?.user?._id,
      cartId: cookie ? cookie.value : '',
      size: productData?.size?.[0],
      color: productData?.colors?.[0] ?? '',
      amount: 1
    };

    try {
      setIsLoading(true);
      const response = (await addNewItemCart(infosCartItem)) as {
        message: string;
        itemCart: {
          shoppingCartId: string;
          productId: string;
          color: string;
          size: string;
        };
      };
      void refetch();

      setTimeout(() => {
        setIsLoading(false);
      }, 700);

      if (response) {
        setMessagePopUp('Produdo adicionado ao carrinho');
        setNameProduct(productData.name);
        setPriceProduct(productData.price);
        setImageProduct(
          productData?.coverPhoto1?.length
            ? productData?.coverPhoto1
            : productData?.images?.[0]
        );
        setTypePopUp('');
        setNewCookie({
          nameCookie: 'cart_id',
          valueCookie: response.itemCart.shoppingCartId,
          duracaoDias: 7
        });
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
    <Link
      href={`/produtos/produto/${_id}`}
      className={`${styles.produto} ${
        promotionPorcent() ? styles.promotion_active : ''
      }`}
    >
      {promotionPorcent() ? (
        <span className={styles.promotion}>{`-${promotionPorcent()}%`}</span>
      ) : (
        ''
      )}
      <div className={styles.like}>
        <Like productId={_id} />
      </div>
      <div className={styles.imagem_div}>
        <ImagemProduto
          images={images}
          coverPhoto1={coverPhoto1}
          coverPhoto2={productData?.coverPhoto2}
        />
      </div>
      <div className={styles.infos}>
        {productData?.codeColors?.[0] ? (
          <div className={styles.cores}>
            {productData?.codeColors?.map((color, index) => {
              return (
                <span
                  key={color + index}
                  style={{ backgroundColor: `${color}` }}
                ></span>
              );
            })}
          </div>
        ) : (
          <></>
        )}
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
      <div className={styles.botoes_card}>
        <button
          className={styles.botao_adicionar}
          onClick={(e) => {
            if (
              (productData?.colors && productData?.colors?.length <= 1) ??
              productData?.size?.length === 1
            ) {
              e.preventDefault();
              void addCartItem();
            }
          }}
        >
          COMPRAR
        </button>
        <div className={styles.botao_ver}>
          <Image
            alt="Imagem ilustrativa de olho"
            src={'/card_produto/olho_icone.svg'}
            width={12}
            height={9}
          />
          <span className={styles.texto_buton}>ESPIAR</span>
        </div>
      </div>
    </Link>
  );
}

export default Produto;
