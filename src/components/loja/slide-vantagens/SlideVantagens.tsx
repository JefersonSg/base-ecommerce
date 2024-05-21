'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import styles from './SlidesVantagens.module.css';
import Vantagem from './Vantagem';

function SlideVantagens() {
  return (
    <>
      <Swiper
        className={`${styles.mySwiper} slide-vantagens`}
        navigation={true}
        pagination={false}
        autoplay={{
          delay: 2500
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            loop: true
          },
          768: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 32,
            loop: true
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
            autoplay: false,
            loop: false
          }
        }}
      >
        <SwiperSlide>
          <Vantagem
            titulo="Envio Rápido"
            texto="e 100% seguro!"
            image="Caminhao"
            link="frete-gratis"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vantagem
            titulo="Formas de pagamentos"
            texto="10% off em compras a vista!"
            image="pix"
            link="formas-de-pagamento"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vantagem
            titulo="Proteção SSL"
            texto="Site protegido e criptografado!"
            image="ssl"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SlideVantagens;
