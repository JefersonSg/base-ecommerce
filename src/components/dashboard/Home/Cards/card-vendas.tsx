import React from 'react';
import styles from './Cards.module.css';

const CardVendas = () => {
  return (
    <section className={styles.container_card}>
      <h3>Vendas nos ultimos 30 dias</h3>
      <div className={styles.infos_card}>
        <div className={styles.container1}>
          <p className={styles.valor_principal}>R$ 25.000</p>
          <div className={styles.comparacao}>
            <span>Graph</span>
            <p>R$ 20.425,00</p>
          </div>
        </div>
        <div className={styles.container_graph}>GRAFICO</div>
      </div>
    </section>
  );
};

export default CardVendas;
