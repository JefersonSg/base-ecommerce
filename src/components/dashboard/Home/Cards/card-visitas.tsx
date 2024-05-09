'use client';

import React from 'react';
import styles from './Cards.module.css';
import ProdutosVisitados from './visitas/produtos-visitados';

export interface TotalViews {
  totalViews: Array<{ _id: string; viewsCount: number }>;
}

const CardVisitas = ({ views }: { views: TotalViews }) => {
  const [totalViews, setTotalViews] = React.useState(0);

  React.useEffect(() => {
    if (views?.totalViews) {
      const total = views?.totalViews?.reduce((count, totalProduto) => {
        return count + +totalProduto.viewsCount;
      }, 0);

      setTotalViews(total);
    }
  }, [views]);

  return (
    <section className={styles.container_card}>
      <h3>Numero de visitas</h3>
      <div className={styles.infos_card}>
        <div className={styles.container1}>
          <p className={styles.valor_principal}>{totalViews} visitas hoje</p>
          <div className={styles.comparacao}>
            {/* <span>Graph</span> */}
            {/* <p>7 a mais que ontem</p> */}
          </div>
        </div>
        <div className={styles.container_graph}>GRAFICO</div>
      </div>
      <p className={styles.texto_produtos}>Produtos visualizados</p>
      {views.totalViews.map((productView) => {
        return (
          <ProdutosVisitados
            key={productView._id}
            views={productView.viewsCount}
            productId={productView._id}
          />
        );
      })}
    </section>
  );
};

export default CardVisitas;
