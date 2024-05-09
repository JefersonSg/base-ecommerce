'use client';

import React from 'react';
import styles from './Cards.module.css';
import ProdutosVisitados from './visitas/produtos-visitados';

export interface TotalViews {
  totalViews: Array<{ _id: string; viewsCount: number }>;
}

const CardVisitas = ({ views }: { views: TotalViews }) => {
  const [totalViews, setTotalViews] = React.useState(0);
  const [mostrarMais, setMostrarMais] = React.useState(3);

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
      {views.totalViews.map(
        (productView, index) =>
          index <= mostrarMais && (
            <ProdutosVisitados
              key={productView._id}
              views={productView.viewsCount}
              productId={productView._id}
            />
          )
      )}
      {views.totalViews.length > 4 && (
        <button
          className={styles.botao_mostrar_mais}
          onClick={() => {
            if (mostrarMais === 3) {
              setMostrarMais(views.totalViews.length);
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
