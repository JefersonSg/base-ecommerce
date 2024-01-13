'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import styles from './SlidesFotosProduto.module.css';
import Image from 'next/image';

function SlideFotos() {
  return (
    <div className={styles.produto_thumbs}>
      <Swiper
        className={`${styles.mySwiper} slide-produto`}
        navigation={true}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={3}
      >
        <SwiperSlide>
          <Image
            alt="Foto do produto"
            src={'/produto/produto1.png'}
            width={88}
            height={88}
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <Image
            alt="Foto do produto"
            src={'/produto/produto1.png'}
            width={88}
            height={88}
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <Image
            alt="Foto do produto"
            src={'/produto/produto1.png'}
            width={88}
            height={88}
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <Image
            alt="Foto do produto"
            src={'/produto/produto1.png'}
            width={88}
            height={88}
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <Image
            alt="Foto do produto"
            src={'/produto/produto1.png'}
            width={88}
            height={88}
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <Image
            alt="Foto do produto"
            src={'/produto/produto1.png'}
            width={88}
            height={88}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SlideFotos;
