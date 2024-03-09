'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import './styles.css';
import styles from './slide-product.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Produto from '../card-product/Produto';

function SlideProduct({ data }: { data: { products: ProductApi[] } }) {
  return (
    <>
      <Swiper
        className={`${styles.mySwiper} slide-produtos`}
        slidesPerView={4}
        navigation={true}
        pagination={false}
        centerInsufficientSlides={true}
        loop={false}
        spaceBetween={16}
        breakpoints={{
          768: {
            spaceBetween: 16
          },
          1024: {
            spaceBetween: 32
          }
        }}
        modules={[Navigation]}
        speed={700}
      >
        {data.products.map((product) => {
          return (
            <SwiperSlide key={product._id}>
              <Produto
                _id={product._id}
                link={product._id}
                name={product.name}
                price={`${product.price}`}
                promotion={product.promotion}
                img={product.images}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SlideProduct;
