import React from 'react';

import styles from './styles.module.css';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import SectionFavorites from '@/src/components/loja/sections-home/SectionFavorites';

const page = () => {
  return (
    <div className={styles.login_container}>
      <Breadcrumb texto="Home / Favoritos" />
      <Titulo titulo="Seus favoritos" />
      <SectionFavorites />
    </div>
  );
};

export default page;
