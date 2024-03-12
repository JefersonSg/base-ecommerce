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
import useMedia from '@/src/shared/hooks/useMedia';

function SlideVantagens() {
  const mobile = useMedia('(max-width: 48rem)');
  const tablets = useMedia('(max-width: 64rem)');

  return (
    <>
      <Swiper
        className={`${styles.mySwiper} slide-vantagens`}
        centeredSlides={mobile ?? false}
        slidesPerView={mobile ? 1 : tablets ? 3 : 4}
        navigation={true}
        spaceBetween={!mobile ? 32 : 0}
        pagination={false}
        loop={!!tablets}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        modules={[Autoplay, Navigation]}
      >
        <SwiperSlide>
          <Vantagem
            titulo="Frete Grátis"
            texto="Confira as Regras!"
            image="Caminhao"
            link="frete-gratis"
          />
        </SwiperSlide>
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
