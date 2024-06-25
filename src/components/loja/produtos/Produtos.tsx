'use client';

import React from 'react';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';
import SlideSubcategorias from './slide/SlideSubcategorias';

// import BotaoFiltro from '@/src/components/compartilhado/botoes/BotaoFiltro';
import {
  type ProductApi,
  type CategoryInterface,
  type subcategoryInterface
} from '@/src/shared/helpers/interfaces';
import { type ProductGetParams } from '@/src/actions/products-active-get';

function Produtos({
  titulo,
  pesquisa,
  data,
  categoryId,
  subcategorieDataSlide,
  categorieDataSlide,
  functionGetProduct
}: {
  titulo?: string;
  pesquisa?: string;
  data?: ProductApi[];
  categoryId?: string;
  subcategorieDataSlide?: { subcategories: subcategoryInterface[] };
  categorieDataSlide?: { categories: CategoryInterface[] };
  functionGetProduct: ({ id, page, total }: ProductGetParams) => Promise<
    | {
        products: ProductApi[];
      }
    | undefined
  >;
}) {
  return (
    <div className={styles.produtos_container}>
      <Titulo
        titulo={`${pesquisa ?? ''} 
        ${
          titulo ??
          (categorieDataSlide?.categories[0]
            ? 'Categorias'
            : subcategorieDataSlide?.subcategories[0]
              ? 'Subcategorias'
              : pesquisa
                ? ''
                : 'Produtos')
        }`}
      />
      <div className={styles.div_titulo}>
        {/* <div className={styles.div_filtro}>
          <BotaoFiltro ativo={ativo} setAtivo={setAtivo} />
        </div> */}
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

      {data && (
        <SectionProdutos
          categoryId={categoryId}
          pesquisa={pesquisa}
          data={data}
          functionGetProduct={functionGetProduct}
        />
      )}
    </div>
  );
}

export default Produtos;
