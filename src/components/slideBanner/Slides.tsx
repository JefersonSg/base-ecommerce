'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Slides.module.css';
import Image from 'next/image';

import './styles.css';

function Slide() {
  return (
    <>
      <Swiper
        className={`${'slide-banner'} mySwiper`}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        navigation={true}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className={styles.imagem}>
            <Image
              alt="imagem banner"
              src={'/banner/image2.png'}
              width={750}
              height={878}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div className={styles.imagem}>
            <Image
              alt="imagem banner"
              src={'/banner/image.png'}
              width={750}
              height={878}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div className={styles.imagem}>
            <Image
              alt="imagem banner"
              src={'/banner/image3.png'}
              width={750}
              height={878}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slide;
