import React from 'react';
import Colecao from './Colecao';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import styles from './SlideColecoes.module.css';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

const SlideColecoes = () => {
  return (
    <Swiper
      className={`${'slide-colecoes'} ${styles.slide_colecoes}`}
      centeredSlides={false}
      spaceBetween={32}
      slidesPerView={'auto'}
      navigation={true}
      modules={[Navigation]}
    >
      <SwiperSlide>
        <Colecao nome="Acessórios" img="acessorios" />
      </SwiperSlide>
      <SwiperSlide>
        <Colecao nome="Maquiagens" img="maquiagem" />
      </SwiperSlide>
      <SwiperSlide>
        <Colecao nome="Itens para banho" img="banho" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SlideColecoes;
