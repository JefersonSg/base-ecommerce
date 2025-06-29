'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

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
        speed={4000}
        navigation={true}
        effect="fade"
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
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
                    quality={90}
                    width={750}
                    height={878}
                    unoptimized
                    sizes="1080px"
                    priority={index === 0}
                  />
                  <Image
                    className={styles.imagem_desktop}
                    alt="imagem banner desktop"
                    src={banner.imageDesktop}
                    width={1920}
                    height={600}
                    sizes="1920px"
                    priority={index === 0}
                    unoptimized
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
