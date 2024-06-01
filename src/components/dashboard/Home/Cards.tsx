'use client';

import React from 'react';
import CardVendas from './Cards/card-vendas';
import CardVisitas from './Cards/card-visitas';
import styles from './Cards/Cards.module.css';
import { getViews } from '@/src/shared/api/GETS';
import CardViews from './Cards/card-visualizações';
import { useQuery } from '@tanstack/react-query';

const Cards = () => {
  const [daysAgo, setDaysAgo] = React.useState(0);

  const { data } = useQuery({
    queryKey: ['getAllViews', daysAgo],
    queryFn: async () => {
      return await getViews(daysAgo);
    }
  });

  return (
    <div className={styles.cards_container}>
      <CardVendas />
      <CardVisitas views={data} setDaysAgo={setDaysAgo} daysAgo={daysAgo} />
      <CardViews views={data} />
    </div>
  );
};

export default Cards;
