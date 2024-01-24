'use client';

import React from 'react';
import { Titulo } from '../textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';
import SlideSubcategorias from './slide/SlideSubcategorias';

function Produtos({ pesquisa }: { pesquisa?: string }) {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div className={styles.produtos_container}>
      <div className={styles.div_titulo}>
        <Titulo titulo={pesquisa ?? ''} />
        <div
          onClick={() => {
            setAtivo(!ativo);
          }}
          className={`${styles.menu_filtro} ${ativo ? styles.ativo : ''}`}
        >
          <span className={styles.linha1}></span>
          <span className={styles.linha2}></span>
          <span className={styles.linha3}></span>
        </div>
      </div>
      {!pesquisa && (
        <div className={styles.subcategorias}>
          <SlideSubcategorias />
        </div>
      )}
      <SectionProdutos pesquisa={pesquisa} />
    </div>
  );
}

export default Produtos;
