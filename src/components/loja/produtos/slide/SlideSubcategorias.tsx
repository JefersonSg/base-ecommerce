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
        slidesPerView={3.2}
        spaceBetween={64}
      >
        <SwiperSlide>
          <Categoria nome="Batom" img="/categorias/batom.png" />
        </SwiperSlide>
        <SwiperSlide>
          <Categoria nome="Batom" img="/categorias/batom.png" />
        </SwiperSlide>
        <SwiperSlide>
          <Categoria nome="Batom" img="/categorias/batom.png" />
        </SwiperSlide>
        <SwiperSlide>
          <Categoria nome="Batom" img="/categorias/batom.png" />
        </SwiperSlide>
        <SwiperSlide>
          <Categoria nome="Batom" img="/categorias/batom.png" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SlideSubcategorias;
