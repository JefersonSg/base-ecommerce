'use client';

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ImagemProduto.module.css';
import { Navigation, Pagination } from 'swiper/modules';
import './slidephoto.css';

const ImagemProduto = ({
  images,
  coverPhoto1,
  coverPhoto2
}: {
  images: string[];
  coverPhoto1?: string;
  coverPhoto2?: string;
}) => {
  const [ativoHover, setAtivoHover] = React.useState(false);

  return (
    <>
      {!ativoHover && (
        <Image
          onMouseEnter={() => {
            if (images.length >= 1 || coverPhoto2?.length) {
              setAtivoHover(true);
            }
          }}
          onMouseLeave={() => {
            setAtivoHover(false);
          }}
          className={styles.imagem}
          alt="Imagem do produto"
          src={coverPhoto1?.length ? coverPhoto1 : images[0]}
          width={185}
          height={243}
          quality={75}
          placeholder="empty"
          sizes="(max-width: 769px) 0vw, 25vw"
          property="true"
          priority={true}
        />
      )}
      {ativoHover && (
        <div className={styles.imagem_wrap}>
          <Image
            onMouseEnter={() => {
              setAtivoHover(true);
            }}
            onMouseLeave={() => {
              setAtivoHover(false);
            }}
            className={`${styles.imagem} ${styles.imagem_hover}`}
            alt="Imagem do produto"
            src={
              coverPhoto2?.length
                ? coverPhoto2
                : images[1]?.length
                  ? images[1]
                  : coverPhoto1?.length
                    ? coverPhoto1
                    : images[0]?.length
                      ? images[0]
                      : images[0]
            }
            width={185}
            height={243}
            quality={75}
            placeholder="empty"
            sizes="(max-width: 769px) 0vw, 25vw"
            property="true"
            priority={true}
          />
        </div>
      )}
      <Swiper
        className={`${styles.mySwiper} slide_photos`}
        navigation={true}
        pagination={true}
        centerInsufficientSlides={true}
        loop={false}
        modules={[Navigation, Pagination]}
        speed={300}
      >
        {coverPhoto1 && (
          <SwiperSlide>
            <Image
              className={styles.imagem_slide}
              alt="Imagem do produto"
              src={coverPhoto1}
              width={185}
              height={243}
              quality={75}
              placeholder="empty"
              sizes="(max-width: 769px) 50vw, 0vw"
              property="true"
              priority={true}
            />
          </SwiperSlide>
        )}
        {images?.map((image, index) => {
          return (
            <SwiperSlide key={image}>
              <Image
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={styles.imagem_slide}
                alt="Imagem do produto"
                src={image}
                width={185}
                height={243}
                quality={75}
                placeholder="empty"
                sizes="(max-width: 769px) 50vw, 0vw"
                property="true"
                priority={index === 0}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ImagemProduto;
