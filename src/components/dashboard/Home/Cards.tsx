import React from 'react';
import CardVendas from './Cards/card-vendas';
import CardVisitas from './Cards/card-visitas';
import styles from './Cards/Cards.module.css';
import { getViews } from '@/src/shared/api/GETS';

const Cards = async () => {
  const views = await getViews();

  return (
    <div className={styles.cards_container}>
      <CardVendas />
      <CardVisitas views={views} />
    </div>
  );
};

export default Cards;
