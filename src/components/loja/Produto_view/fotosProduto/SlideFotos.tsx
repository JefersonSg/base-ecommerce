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

function SlideFotos({
  imagens,
  setImagem,
  imagemId,
  setImagemId
}: {
  imagens: string[];
  setImagem: React.Dispatch<React.SetStateAction<string>>;
  imagemId: string;
  setImagemId: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className={styles.produto_thumbs}>
      <Swiper
        className={`${styles.mySwiper} slide-produto`}
        navigation={true}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={3}
      >
        {imagens?.map((imagem: string, index) => {
          return (
            <SwiperSlide key={index}>
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
                id={`${index}`}
                width={94}
                height={94}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SlideFotos;
