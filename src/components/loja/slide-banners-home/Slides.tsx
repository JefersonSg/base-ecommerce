'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './Slides.module.css';
import Image from 'next/image';

import './styles.css';
import Link from 'next/link';
import { type BannerType } from '@/src/shared/helpers/interfaces';
import useMedia from '@/src/shared/hooks/useMedia';

function Slide({ data }: { data: { banners: BannerType[] } }) {
  const mobile = useMedia('(max-width: 48rem)');

  return (
    <div className={styles.container_banner}>
      <Swiper
        className={`${'slide-banner'} mySwiper`}
        centeredSlides={true}
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
        {data?.banners?.map((banner) => {
          return (
            <SwiperSlide key={banner._id}>
              {' '}
              <div className={styles.imagem}>
                <Link href={banner.link}>
                  <Image
                    alt="imagem banner"
                    src={mobile ? banner.images[0] : banner.images[1]}
                    width={750}
                    height={878}
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
