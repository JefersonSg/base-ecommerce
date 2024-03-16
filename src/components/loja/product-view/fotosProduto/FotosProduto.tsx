'use client';

import Image from 'next/image';
import styles from './FotosProduto.module.css';
import Slide from './SlideFotos';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';

function FotosProduto({ img }: { img: string[] }) {
  const [imagemPrincipal, setImagemPrincipal] = React.useState<string>(
    img ? img[0] : ''
  );
  const [imagemId, setImagemId] = React.useState('0');
  const [fotoInteira, setFotoInteira] = React.useState(false);

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
          <Image
            className={styles.fotoPrincipal}
            alt="Foto do produto"
            id={imagemId}
            src={imagemPrincipal}
            width={350}
            height={350}
            placeholder="blur"
            blurDataURL={img?.[0]}
          />
        </div>
        {fotoInteira && (
          <div className={styles.fotoInteira}>
            <>
              (
              <Image
                className={styles.fotoTelaInteira}
                alt="Foto do produto"
                src={imagemPrincipal}
                width={350}
                height={350}
              />
              <BtnFechar setAtivo={setFotoInteira} />)
            </>
          </div>
        )}
        <Slide
          setImagem={setImagemPrincipal}
          setImagemId={setImagemId}
          imagemId={imagemId}
          imagens={img}
        />
      </div>
      {fotoInteira && <BackgoundClick setState1={setFotoInteira} />}
    </>
  );
}

export default FotosProduto;
