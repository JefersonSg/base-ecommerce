'use client';

import Image from 'next/image';
import styles from './FotosProduto.module.css';
import Slide from './SlideFotos';
import React from 'react';

function FotosProduto({ img }: { img: string[] }) {
  const [imagemPrincipal, setImagemPrincipal] = React.useState('produto1.png');
  const [fotoInteira, setFotoInteira] = React.useState(false);

  return (
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
          src={`/produto/${imagemPrincipal || 'produto1.png'}`}
          width={350}
          height={350}
        />
      </div>
      {fotoInteira && (
        <div className={styles.fotoInteira}>
          <>
            (
            <Image
              className={styles.fotoTelaInteira}
              alt="Foto do produto"
              src={`/produto/${imagemPrincipal || 'produto1.png'}`}
              width={350}
              height={350}
            />
            <span
              className={styles.fechar}
              onClick={() => {
                setFotoInteira(false);
              }}
            >
              X
            </span>
            )
          </>
        </div>
      )}
      <Slide setImagem={setImagemPrincipal} />
    </div>
  );
}

export default FotosProduto;
