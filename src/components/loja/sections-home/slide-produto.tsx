'use client';
import React from 'react';
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

function SlideProduct({ data }: { data: { products: ProductApi[] } }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

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
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {textPopUp && (
        <PopUpMessage
          text={textPopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      <div className={`${styles.loading} ${isLoading ? styles.ativo : ''}`}>
        <LoadingAnimation />
      </div>
      {modalLogin && <CreateAccount setModalLogin={setModalLogin} />}
    </>
  );
}

export default SlideProduct;
