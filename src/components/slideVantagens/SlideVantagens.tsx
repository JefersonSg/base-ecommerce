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
        centeredSlides={true}
        navigation={true}
        pagination={false}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        modules={[Autoplay, Navigation]}
      >
        <SwiperSlide>
          <Vantagem
            titulo="Frete Grátis"
            texto="Confira as Regras!"
            image="Caminhao"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vantagem
            titulo="Envio"
            texto="Rápido e 100% seguro!"
            image="escudo"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vantagem
            titulo="5% de desconto"
            texto="nos pagamentos a vista!"
            image="pix"
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
