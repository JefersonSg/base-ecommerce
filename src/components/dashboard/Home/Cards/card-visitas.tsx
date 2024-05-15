'use client';

import React from 'react';
import styles from './Cards.module.css';
import Image from 'next/image';
import VisitantesViews from './visitas/visitantes-views';

export interface TotalViews {
  totalViews: Array<{ _id: string; viewsCount: number }>;
  ips: Array<{
    _id: string;
    user: Array<string | null>;
    numberVisit: number;
    products: Array<{ productId: string; count: number }>;
  }>;
}

const CardVisitas = ({ views }: { views: TotalViews }) => {
  const [totalViews, setTotalViews] = React.useState(0);
  const [mostrarMais, setMostrarMais] = React.useState(3);

  React.useEffect(() => {
    if (views?.totalViews) {
      const total = views?.totalViews?.reduce((count, totalProduto) => {
        return count + +totalProduto?.viewsCount;
      }, 0);

      setTotalViews(total);
    }
  }, [views]);

  return (
    <section className={styles.container_card}>
      <h3>
        Numero de Visitantes <span>(Hoje)</span>{' '}
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
            {views?.ips?.length} visitantes
          </p>
          <p className={styles.valor_principal}>{totalViews} clicks</p>
        </div>
      </div>
      <p className={styles.texto_produtos}>Visualização por visitante</p>
      {views?.ips?.map(
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
      {views?.ips?.length > 4 && (
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

export default CardVisitas;
