'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './SlideCategoria.module.css';
import Categoria from './categoria/Categoria';
import './styles.css';
import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import useMedia from '@/src/shared/hooks/useMedia';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

function SlideCategoria({
  data
}: {
  data: { categories: CategoryInterface[] };
}) {
  const mobile = useMedia('(max-width:48rem)');

  return (
    <Swiper
      className={`${styles.mySwiper} slide-categoria`}
      slidesPerView={5.5}
      navigation={!mobile}
      modules={[Navigation, Autoplay, Pagination]}
      breakpoints={{
        0: {
          slidesPerView: 2.5
        },
        768: {
          slidesPerView: 3.5
        },
        1024: {
          slidesPerView: 5.5
        }
      }}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }}
      pagination={true}
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
