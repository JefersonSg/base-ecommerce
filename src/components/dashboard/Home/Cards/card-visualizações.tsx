'use client';

import React from 'react';
import styles from './Cards.module.css';
import ProdutosVisitados from './visitas/produtos-visitados';
import Image from 'next/image';
import MenuDropDown from '@/src/components/compartilhado/modals/MenuDropDown';

export interface TotalViews {
  totalViews: Array<{ _id: string; viewsCount: number }>;
  ips: Array<{ _id: string; numberVisit: number }>;
}

const CardViews = ({
  views,
  setDaysAgo,
  daysAgo
}: {
  views: TotalViews;
  setDaysAgo: React.Dispatch<React.SetStateAction<number>>;
  daysAgo: number;
}) => {
  const [mostrarMais, setMostrarMais] = React.useState(3);
  const [active, setActive] = React.useState(false);

  const wrapperRef = React.useRef<any>(null);

  return (
    <section className={styles.container_card}>
      <h3>
        Produtos mais vistos
        <span>
          {daysAgo === 0 ? `( Hoje )` : `( Últimos ${daysAgo} Dias )`}
        </span>
        <Image
          alt="imagem ilustrativa"
          src={'/dashboard/home/titulos/views.svg'}
          width={20}
          height={14}
        />
      </h3>
      <p className={styles.texto_produtos}>
        Produtos visualizados {views?.totalViews?.length}
      </p>
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
      <MenuDropDown
        active={active}
        setActive={setActive}
        setDaysAgo={setDaysAgo}
        wrapperRef={wrapperRef}
      />
    </section>
  );
};

export default CardViews;
