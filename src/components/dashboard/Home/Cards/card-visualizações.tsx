'use client';

import React from 'react';
import styles from './Cards.module.css';
import ProdutosVisitados from './visitas/produtos-visitados';
import Image from 'next/image';

export interface TotalViews {
  totalViews: Array<{ _id: string; viewsCount: number }>;
  ips: Array<{ _id: string; numberVisit: number }>;
}

const CardViews = ({ views }: { views: TotalViews }) => {
  const [mostrarMais, setMostrarMais] = React.useState(3);

  return (
    <section className={styles.container_card}>
      <h3>
        Numero de visualizações{' '}
        <Image
          alt="imagem ilustrativa"
          src={'/dashboard/home/titulos/views.svg'}
          width={20}
          height={14}
        />
      </h3>
      <div className={styles.infos_card}>
        <div className={styles.container1}></div>
      </div>
      <p className={styles.texto_produtos}>Produtos visualizados</p>
      {views?.totalViews?.map(
        (productView, index) =>
          index <= mostrarMais && (
            <ProdutosVisitados
              key={productView?._id}
              views={productView?.viewsCount}
              productId={productView?._id}
            />
          )
      )}
      {views?.totalViews?.length > 4 && (
        <button
          className={styles.botao_mostrar_mais}
          onClick={() => {
            if (mostrarMais === 3) {
              setMostrarMais(views?.totalViews?.length);
            } else {
              setMostrarMais(3);
            }
          }}
        >
          {mostrarMais === 3 ? 'mostrar mais' : 'mostrar menos'}
        </button>
      )}
    </section>
  );
};

export default CardViews;
