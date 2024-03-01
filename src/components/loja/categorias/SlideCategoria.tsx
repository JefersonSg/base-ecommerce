'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './SlideCategoria.module.css';
import Categoria from './categoria/Categoria';
import './styles.css';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';

function SlideCategoria({
  data
}: {
  data: { categories: CategoryInterface[] };
}) {
  return (
    <Swiper
      className={`${styles.mySwiper} slide-categoria`}
      slidesPerView={'auto'}
      spaceBetween={32}
      navigation={false}
      pagination={false}
    >
      {data?.categories?.map((category: any, index: number) => {
        return (
          <SwiperSlide key={category._id}>
            <Categoria
              pathname="categoria"
              link={category?._id}
              nome={category?.name}
              img={category?.image}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SlideCategoria;
