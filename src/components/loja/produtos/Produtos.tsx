'use client';

import React from 'react';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';
import SlideSubcategorias from './slide/SlideSubcategorias';
import BotaoFiltro from '@/src/components/compartilhado/botoes/BotaoFiltro';
import {
  type CategoryInterface,
  type subcategoryInterface
} from '@/src/shared/helpers/interfaces';

function Produtos({
  pesquisa,
  data,
  categoryId,
  subcategorieDataSlide,
  categorieDataSlide
}: {
  pesquisa?: string;
  data?: any;
  categoryId?: string;
  subcategorieDataSlide?: { subcategories: subcategoryInterface[] };
  categorieDataSlide?: { categories: CategoryInterface[] };
}) {
  const [ativo, setAtivo] = React.useState(false);

  console.log(categoryId);
  console.log(subcategorieDataSlide?.subcategories);

  return (
    <div className={styles.produtos_container}>
      <Titulo
        titulo={`${pesquisa ?? ''} 
        ${
          categorieDataSlide?.categories[0]
            ? 'Categorias'
            : subcategorieDataSlide?.subcategories[0]
              ? 'Subcategorias'
              : pesquisa
                ? ''
                : 'Produtos'
        }`}
      />
      <div className={styles.div_titulo}>
        <div className={styles.div_filtro}>
          <BotaoFiltro ativo={ativo} setAtivo={setAtivo} />
        </div>
      </div>
      {!pesquisa && subcategorieDataSlide && (
        <div className={styles.subcategorias}>
          <SlideSubcategorias subcategorieDataSlide={subcategorieDataSlide} />
        </div>
      )}
      {!pesquisa && categorieDataSlide && (
        <div className={styles.subcategorias}>
          <SlideSubcategorias categorieDataSlide={categorieDataSlide} />
        </div>
      )}
      <SectionProdutos pesquisa={pesquisa} data={data} />
    </div>
  );
}

export default Produtos;
