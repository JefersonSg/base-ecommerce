'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import Categoria from '../../categorias/categoria/Categoria';

function SlideSubcategorias() {
  return (
    <>
      <Swiper
        className={`slide-subcategorias`}
        slidesPerView={'auto'}
        spaceBetween={16}
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
    </>
  );
}

export default SlideSubcategorias;
