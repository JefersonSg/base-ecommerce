import React, { Suspense } from 'react';

import styles from './styles.module.css';
import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import SectionFavorites from '@/src/components/loja/sections-home/SectionFavorites';

const page = () => {
  return (
    <div className={styles.favorite_container}>
      <Breadcrumb texto="Home / Favoritos" />
      <Suspense>
        <SectionFavorites />
      </Suspense>
    </div>
  );
};

export default page;
