'use client';

import React from 'react';
import { Titulo } from '../textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';
import SlideSubcategorias from './slide/SlideSubcategorias';
import BotaoFiltro from '../botoes/BotaoFiltro';

function Produtos({ pesquisa }: { pesquisa?: string }) {
  const [ativo, setAtivo] = React.useState(false);

  return (
    <div className={styles.produtos_container}>
      <div className={styles.div_titulo}>
        <Titulo titulo={pesquisa ?? ''} />
        <BotaoFiltro ativo={ativo} setAtivo={setAtivo} />
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
