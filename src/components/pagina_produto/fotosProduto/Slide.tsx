'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import styles from './SlidesVantagens.module.css';
import Image from 'next/image';

function Slide() {
  return (
    <Swiper
      className={`${styles.mySwiper} slide-produto`}
      navigation={true}
      pagination={false}
      loop={true}
      modules={[Navigation]}
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
    </Swiper>
  );
}

export default Slide;
