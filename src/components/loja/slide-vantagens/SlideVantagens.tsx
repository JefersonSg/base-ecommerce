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
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false
        }}
        grabCursor={false}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            centeredSlides: false,
            freeMode: true
          },
          768: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 32,
            loop: true,
            freeMode: false
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
