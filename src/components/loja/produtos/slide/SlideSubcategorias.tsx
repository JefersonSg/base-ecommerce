'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import Categoria from '../../categorias/categoria/Categoria';
import { getSubcategoryByCategory } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';

function SlideSubcategorias({ categoryId }: { categoryId: string }) {
  const { data } = useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: async () => [await getSubcategoryByCategory(categoryId)]
  });
  return (
    <>
      <Swiper
        className={`slide-subcategorias`}
        slidesPerView={3.2}
        spaceBetween={64}
      >
        {data?.[0].subcategories?.map((subcategory: any, index: number) => {
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
        })}
      </Swiper>
    </>
  );
}

export default SlideSubcategorias;
