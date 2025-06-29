'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import styles from './SlidesFotosProduto.module.css';
import Image from 'next/image';

function SlideFotos({
  imagens,
  setImagem,
  imagemId,
  setImagemId,
  setThumbsSwiper
}: {
  imagens: string[];
  setImagem: React.Dispatch<React.SetStateAction<string>>;
  imagemId: string;
  setImagemId: React.Dispatch<React.SetStateAction<string>>;
  setThumbsSwiper: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <div className={styles.produto_thumbs}>
      <Swiper
        onSwiper={setThumbsSwiper}
        className={`${styles.mySwiper} slide-produto`}
        navigation={true}
        spaceBetween={16}
        slidesPerView={3}
        watchSlidesProgress
        freeMode={true}
        modules={[Navigation, Controller, Thumbs, FreeMode]}
        breakpoints={{
          1024: {
            spaceBetween: 12,
            slidesPerView: 5,
            direction: 'vertical'
          }
        }}
      >
        {imagens?.map((imagem: string, index) => {
          return (
            <SwiperSlide key={index} className={styles.container_image}>
              <Image
                onClick={() => {
                  setImagem(imagem);
                  setImagemId(index.toString());
                }}
                className={`${styles.foto_slide} ${
                  index.toString() === imagemId ? 'ativo' : ''
                }`}
                alt="Foto do produto"
                src={imagem}
                width={80}
                height={80}
                quality={50}
                sizes="80px"
                id={`${index}`}
                unoptimized
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SlideFotos;
