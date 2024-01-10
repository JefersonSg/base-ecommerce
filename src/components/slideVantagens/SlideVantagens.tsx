'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

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
        modules={[Autoplay, Pagination, Navigation]}
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
            titulo="Frete Grátis"
            texto="Confira as Regras!"
            image="Caminhao"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Vantagem
            titulo="Frete Grátis"
            texto="Confira as Regras!"
            image="Caminhao"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SlideVantagens;
