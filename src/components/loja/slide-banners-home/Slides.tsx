'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';

import styles from './Slides.module.css';
import Image from 'next/image';

import './styles.css';
import Link from 'next/link';
import { type BannerType } from '@/src/shared/helpers/interfaces';

function Slide({ data }: { data: { banners: BannerType[] } }) {
  return (
    <div className={styles.container_banner}>
      <Swiper
        className={`${'slide-banner'} mySwiper`}
        centeredSlides={true}
        height={400}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        speed={1000}
        navigation={true}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {data?.banners?.map((banner, index) => {
          return (
            <SwiperSlide key={banner._id} className="banner-wraper">
              {' '}
              <div className={styles.imagem}>
                <Link href={banner.link}>
                  <Image
                    className={styles.imagem_mobile}
                    alt="imagem banner mobile"
                    src={banner.imageMobile}
                    placeholder="empty"
                    quality={80}
                    width={750}
                    height={878}
                    sizes="100vw"
                    priority={index < 2}
                  />
                  <Image
                    className={styles.imagem_desktop}
                    alt="imagem banner desktop"
                    src={banner.imageDesktop}
                    placeholder="empty"
                    quality={80}
                    width={1920}
                    height={600}
                    sizes="100vw"
                    priority={index < 2}
                  />
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slide;
