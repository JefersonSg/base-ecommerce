'use client';

import 'swiper/css';

import Image from 'next/image';
import styles from './FotosProduto.module.css';
import Slide from './SlideFotos';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, FreeMode, Thumbs } from 'swiper/modules';

function FotosProduto({ img }: { img: string[] }) {
  const [imagemPrincipal, setImagemPrincipal] = React.useState<string>(
    img ? img[0] : ''
  );
  const [imagemId, setImagemId] = React.useState('0');
  const [fotoInteira, setFotoInteira] = React.useState(false);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const [, setActiveSlide] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setActiveSlide(true);
    }, 0);
  }, []);

  const params = useSearchParams()?.get('_id');

  React.useEffect(() => {
    setImagemPrincipal(img[0]);
  }, [img, params]);

  React.useEffect(() => {
    if (fotoInteira) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [fotoInteira]);

  return (
    <>
      <div className={styles.fotosProduto}>
        <div
          className={styles.container_image}
          onClick={() => {
            setFotoInteira(true);
          }}
        >
          <Suspense>
            <Swiper
              slidesPerView={1}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Controller, Thumbs, FreeMode]}
            >
              {img?.map((image) => {
                return (
                  <SwiperSlide
                    className={styles.imagem_slide_principal}
                    key={image}
                    onClick={() => {
                      setImagemPrincipal(image);
                    }}
                  >
                    <Image
                      className={styles.fotoPrincipal}
                      alt="Foto do produto"
                      id={imagemId}
                      src={image}
                      fill
                      placeholder="blur"
                      blurDataURL={image}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Suspense>
        </div>
        {fotoInteira && (
          <div className={styles.fotoInteira_bg}>
            <>
              <Image
                className={styles.fotoInteira_img}
                alt="Foto do produto"
                src={imagemPrincipal}
                width={350}
                height={350}
              />
              <BtnFechar setAtivo={setFotoInteira} />
            </>
          </div>
        )}
        {img[0] && (
          <Suspense>
            <Slide
              setImagem={setImagemPrincipal}
              setImagemId={setImagemId}
              setThumbsSwiper={setThumbsSwiper}
              imagemId={imagemId}
              imagens={img}
            />
          </Suspense>
        )}
      </div>
      {fotoInteira && <BackgoundClick setState1={setFotoInteira} />}
    </>
  );
}

export default FotosProduto;
