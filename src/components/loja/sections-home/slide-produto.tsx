'use client';
import React, { Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import './styles.css';
import styles from './slide-product.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Produto from '../card-product/Produto';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';
import LoadingAnimation from '../../compartilhado/loading/loadingAnimation';
import CreateAccount from '../../compartilhado/modals/CreateAccount';
import MessageFloating from '../../compartilhado/messages/message-floating-cart';

function SlideProduct({ data }: { data: { products: ProductApi[] } }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');
  const [nameProduct, setNameProduct] = React.useState('');
  const [priceProduct, setPriceProduct] = React.useState<number>(0);
  const [imageProduct, setImageProduct] = React.useState('');

  return (
    <>
      <Swiper
        className={`${styles.mySwiper} slide-produtos`}
        slidesPerView={4}
        navigation={true}
        pagination={false}
        centerInsufficientSlides={true}
        loop={false}
        spaceBetween={16}
        breakpoints={{
          768: {
            spaceBetween: 16
          },
          1024: {
            spaceBetween: 32
          }
        }}
        modules={[Navigation]}
        speed={700}
      >
        {data?.products?.map((product) => {
          return (
            <SwiperSlide key={product._id}>
              <Produto
                setMessagePopUp={setMessagePopUp}
                setTypePopUp={setTypePopUp}
                key={product._id}
                productData={product}
                setIsLoading={setIsLoading}
                setModalLogin={setModalLogin}
                setImageProduct={setImageProduct}
                setNameProduct={setNameProduct}
                setPriceProduct={setPriceProduct}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {textPopUp && typePopUp === 'error' && (
        <PopUpMessage
          text={textPopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      <div className={`${styles.loading} ${isLoading ? styles.ativo : ''}`}>
        <Suspense>
          <LoadingAnimation />
        </Suspense>
      </div>
      {modalLogin && <CreateAccount setModalLogin={setModalLogin} />}
      {textPopUp && typePopUp !== 'error' && (
        <MessageFloating
          amount={1}
          img={imageProduct}
          nameProduct={nameProduct}
          priceProduct={priceProduct}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
        />
      )}
    </>
  );
}

export default SlideProduct;
