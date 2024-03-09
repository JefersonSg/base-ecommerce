'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import './styles.css';
import styles from './slide-product.module.css';
import useMedia from '@/src/shared/hooks/useMedia';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Produto from '../card-product/Produto';

function SlideProduct({ data }: { data: { products: ProductApi[] } }) {
  const mobile = useMedia('(max-width: 64rem)');

  return (
    <>
      <Swiper
        className={`${styles.mySwiper} slide-produtos`}
        slidesPerView={4}
        navigation={true}
        pagination={false}
        loop={false}
        spaceBetween={mobile ? 16 : 32}
        modules={[Navigation]}
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
