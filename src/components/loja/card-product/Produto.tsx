'use client';

import Image from 'next/image';
import styles from './Produto.module.css';
import './produto.css';

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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

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
  const [ativoHover, setAtivoHover] = React.useState(false);
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

    if (!userData?.data?.user?._id) {
      setTypePopUp('error');
      setIsLoading(false);
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
          <span className={styles.promotion}>{`-${promotionPorcent()}%`}</span>
        ) : (
          ''
        )}
        {images && (
          <>
            <Image
              onMouseEnter={() => {
                setAtivoHover(true);
              }}
              onMouseLeave={() => {
                setAtivoHover(false);
              }}
              className={styles.imagem}
              alt="Imagem do produto"
              src={
                ativoHover
                  ? coverPhoto1?.length
                    ? coverPhoto1
                    : images[0]
                  : productData?.coverPhoto2?.length
                    ? productData.coverPhoto2
                    : images[1]
                      ? images[1]
                      : images[0]
              }
              width={185}
              height={243}
              quality={75}
              placeholder="empty"
              sizes="(max-width: 1024px) 0vw, 25vw"
              property="true"
              priority={true}
            />
            <Swiper
              className={`${styles.mySwiper} slide_photos`}
              navigation={true}
              pagination={false}
              centerInsufficientSlides={true}
              loop={true}
              modules={[Navigation]}
              speed={0}
            >
              {coverPhoto1 && (
                <SwiperSlide
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Image
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className={styles.imagem_slide}
                    alt="Imagem do produto"
                    src={coverPhoto1}
                    width={185}
                    height={243}
                    quality={75}
                    placeholder="empty"
                    sizes="(max-width: 1024px) 50vw, 0vw"
                    property="true"
                    priority={true}
                  />
                </SwiperSlide>
              )}
              {images?.map((image, index) => {
                return (
                  <SwiperSlide key={image}>
                    <Image
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className={styles.imagem_slide}
                      alt="Imagem do produto"
                      src={image}
                      width={185}
                      height={243}
                      quality={75}
                      placeholder="empty"
                      sizes="(max-width: 1024px) 50vw, 0vw"
                      property="true"
                      priority={index === 0}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
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
      <div className={styles.botoes_card}>
        <button
          className={styles.botao_adicionar}
          onClick={(e) => {
            if (!userData?.data?.user?._id) {
              e.preventDefault();
              setModalLogin(true);
            }
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
        <button className={styles.botao_ver}>
          <Image
            alt="Imagem ilustrativa de olho"
            src={'/card_produto/olho_icone.svg'}
            width={12}
            height={9}
          />
          <span className={styles.texto_buton}>ESPIAR</span>
        </button>
      </div>
    </Link>
  );
}

export default Produto;
