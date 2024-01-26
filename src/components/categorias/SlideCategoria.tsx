'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './SlideCategoria.module.css';
import Categoria from './categoria/Categoria';
import './styles.css';

function SlideCategoria() {
  return (
    <Swiper
      className={`${styles.mySwiper} slide-categoria`}
      slidesPerView={'auto'}
      spaceBetween={32}
      navigation={false}
      pagination={false}
    >
      <SwiperSlide>
        <Categoria nome="Batom" img="batom" />
      </SwiperSlide>
      <SwiperSlide>
        <Categoria nome="Batom" img="batom" />
      </SwiperSlide>
      <SwiperSlide>
        <Categoria nome="Batom" img="batom" />
      </SwiperSlide>
      <SwiperSlide>
        <Categoria nome="Batom" img="batom" />
      </SwiperSlide>
      <SwiperSlide>
        <Categoria nome="Batom" img="batom" />
      </SwiperSlide>
    </Swiper>
  );
}

export default SlideCategoria;
