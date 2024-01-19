import React from 'react';
import Colecao from './Colecao';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styles from './SlideColecoes.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

const SlideColecoes = () => {
  return (
    <Swiper
      className={`${'slide-colecoes'} ${styles.slide_colecoes}`}
      centeredSlides={true}
      width={300}
      spaceBetween={32}
      navigation={true}
      pagination={false}
      modules={[Autoplay, Pagination, Navigation]}
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
