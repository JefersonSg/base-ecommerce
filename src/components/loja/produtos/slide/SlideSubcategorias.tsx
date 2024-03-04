'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import Categoria from '../../categorias/categoria/Categoria';

import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';

function SlideSubcategorias({
  subcategorieDataSlide
}: {
  subcategorieDataSlide: { subcategories: subcategoryInterface[] };
}) {
  return (
    <>
      <Swiper
        className={`slide-subcategorias`}
        slidesPerView={3.2}
        spaceBetween={64}
      >
        {subcategorieDataSlide?.subcategories?.map(
          (subcategory: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Categoria
                  pathname="subcategoria"
                  link={subcategory?._id}
                  nome={subcategory?.name}
                  img={subcategory?.image}
                />
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </>
  );
}

export default SlideSubcategorias;
