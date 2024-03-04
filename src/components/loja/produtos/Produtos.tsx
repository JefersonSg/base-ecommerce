'use client';

import React from 'react';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';
import SlideSubcategorias from './slide/SlideSubcategorias';
import BotaoFiltro from '@/src/components/compartilhado/botoes/BotaoFiltro';
import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';

function Produtos({
  pesquisa,
  data,
  categoryId,
  subcategorieDataSlide
}: {
  pesquisa?: string;
  data?: any;
  categoryId?: string;
  subcategorieDataSlide?: { subcategories: subcategoryInterface[] };
}) {
  const [ativo, setAtivo] = React.useState(false);

  console.log(subcategorieDataSlide);
  return (
    <div className={styles.produtos_container}>
      <div className={styles.div_titulo}>
        <Titulo titulo={pesquisa ?? ''} />
        <BotaoFiltro ativo={ativo} setAtivo={setAtivo} />
      </div>
      {!pesquisa && subcategorieDataSlide && (
        <div className={styles.subcategorias}>
          <SlideSubcategorias subcategorieDataSlide={subcategorieDataSlide} />
        </div>
      )}
      <SectionProdutos pesquisa={pesquisa} data={data} />
    </div>
  );
}

export default Produtos;
