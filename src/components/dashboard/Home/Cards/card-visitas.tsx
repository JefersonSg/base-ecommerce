'use client';

import React from 'react';
import styles from './Cards.module.css';
import Image from 'next/image';
import VisitantesViews from './visitas/visitantes-views';

export interface TotalViews {
  totalViews: Array<{ _id: string; viewsCount: number }>;
  sessions: Array<{
    _id: string;
    user: Array<string | null>;
    numberVisit: number;
    products: Array<{ productId: string; count: number }>;
  }>;
}

const CardVisitas = ({
  views,
  setDaysAgo,
  daysAgo
}: {
  views: TotalViews;
  setDaysAgo: React.Dispatch<React.SetStateAction<number>>;
  daysAgo: number;
}) => {
  const [totalViews, setTotalViews] = React.useState(0);
  const [mostrarMais, setMostrarMais] = React.useState(3);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (views?.totalViews) {
      const total = views?.totalViews?.reduce((count, totalProduto) => {
        return count + +totalProduto?.viewsCount;
      }, 0);

      setTotalViews(total);
    }
  }, [views]);

  const wrapperRef = React.useRef<any>(null);

  return (
    <section
      className={styles.container_card}
      onClick={(e) => {
        if (active && e.target && !wrapperRef?.current?.contains(e.target)) {
          setActive(false);
        }
      }}
    >
      <h3>
        Numero de Visitantes{' '}
        <span>
          {daysAgo === 0 ? `( Hoje )` : `( Últimos ${daysAgo} Dias )`}
        </span>{' '}
        <Image
          alt="imagem ilustrativa"
          src={'/dashboard/home/titulos/views.svg'}
          width={20}
          height={14}
        />
      </h3>
      <div className={styles.infos_card}>
        <div className={styles.container1}>
          <p className={`${styles.valor_principal} ${styles.p1}`}>
            {views?.sessions?.length} visitantes
          </p>
          <p className={styles.valor_principal}>{totalViews} clicks</p>
        </div>
      </div>
      <p className={styles.texto_produtos}>Visualização por visitante</p>
      {views?.sessions?.map(
        (userView, index) =>
          index <= mostrarMais && (
            <VisitantesViews
              key={userView._id}
              ip={userView._id}
              user={userView.user}
              views={userView.numberVisit}
              products={userView.products}
            />
          )
      )}
      {views?.sessions?.length > 4 && (
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

      <div className={styles.modal_select_days}>
        <div
          className={styles.botao}
          onClick={() => {
            setActive(!active);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        {active && (
          <div className={styles.opcoes} ref={wrapperRef}>
            <p
              onClick={() => {
                setDaysAgo(0);
                setActive(false);
              }}
            >
              Hoje
            </p>
            <p
              onClick={() => {
                setDaysAgo(7);
                setActive(false);
              }}
            >
              7 dias atrás
            </p>
            <p
              onClick={() => {
                setDaysAgo(15);
                setActive(false);
              }}
            >
              15 dias atrás
            </p>
            <p
              onClick={() => {
                setDaysAgo(30);
                setActive(false);
              }}
            >
              30 dias atrás
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardVisitas;
