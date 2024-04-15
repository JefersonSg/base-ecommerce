'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import Categoria from '../../categorias/categoria/Categoria';

import {
  type CategoryInterface,
  type subcategoryInterface
} from '@/src/shared/helpers/interfaces';

function SlideSubcategorias({
  subcategorieDataSlide,
  categorieDataSlide
}: {
  subcategorieDataSlide?: { subcategories: subcategoryInterface[] };
  categorieDataSlide?: { categories: CategoryInterface[] };
}) {
  return (
    <Swiper
      className={`slide-subcategorias`}
      slidesPerView={'auto'}
      spaceBetween={32}
      breakpoints={{
        0: {
          slidesPerView: 1.8
        },
        375: {
          slidesPerView: 2.6
        },
        500: {
          slidesPerView: 3.5
        },
        768: {
          slidesPerView: 4.2,
          spaceBetween: 64
        }
      }}
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
      {categorieDataSlide?.categories?.map(
        (subcategory: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <Categoria
                pathname="categoria"
                link={subcategory?._id}
                nome={subcategory?.name}
                img={subcategory?.image}
              />
            </SwiperSlide>
          );
        }
      )}
    </Swiper>
  );
}

export default SlideSubcategorias;
